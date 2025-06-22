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
const fs = require('fs');

const authRoutes = require('./src/routes/auth');
const clientsRoutes = require('./src/routes/clients');
const categoriesRoutes = require('./src/routes/categories');
const documentsRoutes = require('./src/routes/documents');
const tasksRoutes = require('./src/routes/tasks');
const messagesRoutes = require('./src/routes/messages');
const usersRoutes = require('./src/routes/users');
const companiesRoutes = require('./src/routes/companies');

const app = express();
// Create HTTP server
const server = require('http').createServer(app);

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
  'http://localhost:5173',
  'https://localhost:5173',
  'http://127.0.0.1:5173',
  'https://127.0.0.1:5173',
  'https://accountant-new.onrender.com',
  'https://accountant-frontend.onrender.com'
];

// Configure CORS with enhanced options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.warn(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Add headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Serve uploads statically from /uploads at root (http://localhost:3000/uploads/...)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        console.warn(`Socket.IO connection blocked by CORS: ${origin}`);
        return callback(new Error('Not allowed by CORS'), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
  },
  transports: ['websocket', 'polling'],
  maxHttpBufferSize: 1e8, // 100MB max payload
  allowUpgrades: true,
  perMessageDeflate: {
    threshold: 1024,
    clientNoContextTakeover: true,
    serverNoContextTakeover: true
  },
  pingTimeout: 30000,
  pingInterval: 25000,
  cookie: false,
  serveClient: false
});

// Socket.IO authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || 
                 (socket.handshake.headers?.authorization && 
                  socket.handshake.headers.authorization.split(' ')[1]);
    
    if (!token) {
      console.log('Socket.IO: No token provided');
      return next(new Error('Authentication error: No token provided'));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    console.error('Socket.IO authentication error:', error.message);
    next(new Error('Authentication error: Invalid token'));
  }
});

const User = require("./src/models/User");
const Message = require("./src/models/Message");
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

const userSockets = {};
const onlineUsers = new Set();

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
    userSockets[userId] = userSockets[userId] || [];
    userSockets[userId].push(socket.id);

    console.log(`[Socket.io] User ${userId} now has ${userSockets[userId].length} active connections`);
    console.log('Active sockets:', userSockets);

    try {
      onlineUsers.add(userId);
      await User.findByIdAndUpdate(userId, { 
        online: true, 
        lastSeen: new Date() 
      });
      console.log(`[Socket.io] Updated user ${userId} status to online`);
      io.emit('userStatus', { userId, isOnline: true });
    } catch (err) {
      console.error('[Socket.io] Error updating user status:', err);
    }

    socket.on('disconnect', async () => {
      console.log(`\n[Socket.io] Socket ${socket.id} disconnected`);

      if (userId) {
        if (userSockets[userId]) {
          userSockets[userId] = userSockets[userId].filter(id => id !== socket.id);

          if (userSockets[userId].length === 0) {
            delete userSockets[userId];
            onlineUsers.delete(userId);

            try {
              await User.findByIdAndUpdate(userId, { online: false, lastSeen: new Date() });
              console.log(`[Socket.io] Updated user ${userId} status to offline`);
              io.emit('userStatus', { userId, isOnline: false });
            } catch (err) {
              console.error('[Socket.io] Error updating user status to offline:', err);
            }
          }
        }
      }
    });

    socket.on('getOnlineUsers', (callback) => {
      if (typeof callback === 'function') {
        callback(Array.from(onlineUsers));
      }
    });

    socket.on('sendMessage', async (message) => {
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
        const messageData = {
          senderId: message.senderId,
          recipientId: message.recipientId,
          content: message.content,
          timestamp: new Date()
        };

        if (message.taskId && message.taskId !== 'contact' && mongoose.Types.ObjectId.isValid(message.taskId)) {
          messageData.taskId = message.taskId;
        }

        const savedMessage = await Message.create(messageData);

        console.log(`[Socket.io] Saved message to database with ID: ${savedMessage._id}`);

        const messageToSend = {
          ...savedMessage.toObject(),
          _id: savedMessage._id.toString(),
          senderId: savedMessage.senderId.toString(),
          recipientId: savedMessage.recipientId.toString(),
          timestamp: savedMessage.timestamp ? new Date(savedMessage.timestamp).toISOString() : new Date().toISOString()
        };

        if (userSockets[message.recipientId]?.length > 0) {
          console.log(`[Socket.io] Sending to recipient ${message.recipientId}'s ${userSockets[message.recipientId].length} socket(s)`);
          userSockets[message.recipientId].forEach(socketId => {
            console.log(`[Socket.io] Emitting newMessage to socket ${socketId}`);
            io.to(socketId).emit('newMessage', messageToSend);
          });
        } else {
          console.log(`[Socket.io] Recipient ${message.recipientId} has no active sockets`);
        }

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

app.set('io', io);
app.set('userSockets', userSockets);

app.use(express.json());

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

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server available at ws://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
