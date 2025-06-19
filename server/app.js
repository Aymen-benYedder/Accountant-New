// Main Express app, CommonJS, JavaScript-only

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require("jsonwebtoken");
const path = require('path');

const authRoutes = require('./src/routes/auth');
const clientsRoutes = require('./src/routes/clients');
const categoriesRoutes = require('./src/routes/categories');
const documentsRoutes = require('./src/routes/documents');
const tasksRoutes = require('./src/routes/tasks');
const messagesRoutes = require('./src/routes/messages');
const usersRoutes = require('./src/routes/users');
const companiesRoutes = require('./src/routes/companies');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://accountant-new.onrender.com',
    'https://accountant-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Serve uploads statically from /uploads at root (http://localhost:3000/uploads/...)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Handle preflight requests
app.options('*', cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['*', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  }
});

const User = require("./src/models/User");
const Message = require("./src/models/Message");
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// Track all sockets per userId for robust disconnect handling
const userSockets = {};
const onlineUsers = new Set(); // Track online user IDs

// Socket.io realtime connection tracking, robust for multi-tab/disconnect
io.on('connection', async (socket) => {
  console.log('\n=== New Socket.io Connection ===');
  console.log(`[${new Date().toISOString()}] Socket ID: ${socket.id}`);
  console.log('Handshake:', {
    auth: socket.handshake.auth,
    query: socket.handshake.query,
    headers: {
      'x-forwarded-for': socket.handshake.headers['x-forwarded-for'],
      'user-agent': socket.handshake.headers['user-agent']
    }
  });

  let token = socket.handshake.auth?.token || 
             (socket.handshake.headers?.authorization && 
              socket.handshake.headers.authorization.split(" ")[1]);
  if (!token && socket.handshake.query?.token) {
    token = socket.handshake.query.token;
    console.log('[Socket.io] Using token from query params');
  }
  
  console.log('[Socket.io] Extracted token:', token ? `${token.substring(0, 10)}...` : 'No token found');
  
  let userId = null;
  try {
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id || decoded._id || decoded.sub;
      console.log(`[Socket.io] Authenticated user ID: ${userId}`);
      console.log(`[Socket.io] Token payload:`, {
        exp: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : 'No expiry',
        iat: decoded.iat ? new Date(decoded.iat * 1000).toISOString() : 'No issued at',
        ...(decoded.email && { email: decoded.email })
      });
    } else {
      console.log('[Socket.io] No token found in handshake');
    }
  } catch (e) {
    console.error('[Socket.io] JWT verification failed:', e.message || e);
  }
  
  if (userId) {
    // Add socket.id to this user's active socket list
    userSockets[userId] = userSockets[userId] || [];
    userSockets[userId].push(socket.id);
    
    console.log(`[Socket.io] User ${userId} now has ${userSockets[userId].length} active connections`);
    console.log('Active sockets:', userSockets);
    
    // Mark user online
    try {
      onlineUsers.add(userId);
      await User.findByIdAndUpdate(userId, { 
        online: true, 
        lastSeen: new Date() 
      });
      console.log(`[Socket.io] Updated user ${userId} status to online`);
      // Broadcast user online status to all connected clients
      io.emit('userStatus', { userId, isOnline: true });
    } catch (err) {
      console.error('[Socket.io] Error updating user status:', err);
    }
    
    // Listen for disconnect
    socket.on('disconnect', async () => {
      console.log(`\n[Socket.io] Socket ${socket.id} disconnected`);
      
      if (userId) {
        // Remove this socket from user's active sockets
        if (userSockets[userId]) {
          userSockets[userId] = userSockets[userId].filter(id => id !== socket.id);
          
          // If no more sockets for this user, mark as offline
          if (userSockets[userId].length === 0) {
            delete userSockets[userId];
            onlineUsers.delete(userId);
            
            try {
              await User.findByIdAndUpdate(userId, { online: false, lastSeen: new Date() });
              console.log(`[Socket.io] Updated user ${userId} status to offline`);
              // Broadcast user offline status to all connected clients
              io.emit('userStatus', { userId, isOnline: false });
            } catch (err) {
              console.error('[Socket.io] Error updating user status to offline:', err);
            }
          }
        }
      }
    });

    // Handle getOnlineUsers request
    socket.on('getOnlineUsers', (callback) => {
      if (typeof callback === 'function') {
        callback(Array.from(onlineUsers));
      }
    });

    // Listen for new messages
    socket.on('sendMessage', async (message) => {
      // Ensure the message has the senderId set from the authenticated user
      if (!message.senderId && userId) {
        message.senderId = userId;
      }
      
      console.log('\n[Socket.io] Received sendMessage event:', {
        from: message.senderId,
        to: message.recipientId,
        content: message.content ? `${message.content.substring(0, 50)}...` : 'No content',
        timestamp: new Date().toISOString()
      });

      try {
        // Prepare message data
        const messageData = {
          senderId: message.senderId,
          recipientId: message.recipientId,
          content: message.content,
          timestamp: new Date()
        };

        // Only include taskId if it's a valid ObjectId or undefined
        if (message.taskId && message.taskId !== 'contact' && mongoose.Types.ObjectId.isValid(message.taskId)) {
          messageData.taskId = message.taskId;
        }

        // Save the message to the database
        const savedMessage = await Message.create(messageData);
        
        console.log(`[Socket.io] Saved message to database with ID: ${savedMessage._id}`);

        // Prepare the message object with proper serialization
        const messageToSend = {
          ...savedMessage.toObject(),
          _id: savedMessage._id.toString(),
          senderId: savedMessage.senderId.toString(),
          recipientId: savedMessage.recipientId.toString(),
          timestamp: savedMessage.timestamp ? new Date(savedMessage.timestamp).toISOString() : new Date().toISOString()
        };

        // Broadcast the message to the recipient
        if (userSockets[message.recipientId]?.length > 0) {
          console.log(`[Socket.io] Sending to recipient ${message.recipientId}'s ${userSockets[message.recipientId].length} socket(s)`);
          userSockets[message.recipientId].forEach(socketId => {
            console.log(`[Socket.io] Emitting newMessage to socket ${socketId}`);
            io.to(socketId).emit('newMessage', messageToSend);
          });
        } else {
          console.log(`[Socket.io] Recipient ${message.recipientId} has no active sockets`);
        }

        // Also send to sender's other tabs
        if (userSockets[message.senderId]?.length > 0) {
          console.log(`[Socket.io] Sending to sender ${message.senderId}'s other ${userSockets[message.senderId].length - 1} socket(s)`);
          userSockets[message.senderId].forEach(socketId => {
            if (socketId !== socket.id) {
              console.log(`[Socket.io] Emitting newMessage to sender's other socket ${socketId}`);
              io.to(socketId).emit('newMessage', messageToSend);
            }
          });
        }
      } catch (err) {
        console.error('[Socket.io] Error in sendMessage handler:', err);
      }
    });
    
    // Log all events for debugging
    const originalEmit = socket.emit;
    socket.emit = function(event, ...args) {
      console.log(`[Socket.io] Emitting event '${event}' to socket ${socket.id}`);
      return originalEmit.apply(socket, [event, ...args]);
    };
    
  } else {
    console.log('[Socket.io] Connection rejected - could not authenticate user');
    socket.disconnect(true);
  }
});

// Make io accessible to routes
app.set('io', io);
app.set('userSockets', userSockets);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    const mongoose = require("mongoose");
    console.log("process.env.MONGO_URI:", process.env.MONGO_URI);
    console.log("Mongoose connection host:", mongoose.connection.host);
    console.log("Mongoose connection name (db):", mongoose.connection.name);
    console.log("Mongoose connection user:", mongoose.connection.user);
  })
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/companies', companiesRoutes);

app.get('/', (req, res) => {
  res.send('Accounting Platform API running');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});