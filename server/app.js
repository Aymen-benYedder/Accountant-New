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

// Enhanced CORS configuration for development and production
const allowedOrigins = [
  // Local development
  'http://localhost:3000',
  'https://localhost:3000',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
  'http://localhost:5173',
  'https://localhost:5173',
  'http://127.0.0.1:5173',
  'https://127.0.0.1:5173',
  
  // Production
  'https://accountant-new.onrender.com',
  'https://accountant-frontend.onrender.com',
  
  // Development and testing
  'http://localhost:*',
  'http://127.0.0.1:*',
  'null' // For file:// protocol
];

// Configure CORS with enhanced options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like file:// protocol or mobile apps)
    if (!origin) {
      console.log('Allowing request with no origin (likely file:// protocol)');
      return callback(null, true);
    }
    
    // Check if the origin matches any of our allowed patterns
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      // Handle wildcard ports
      if (allowedOrigin.endsWith(':*')) {
        const baseOrigin = allowedOrigin.replace(':*', '');
        return origin.startsWith(baseOrigin);
      }
      return origin === allowedOrigin;
    });
    
    if (!isAllowed) {
      const msg = `CORS blocked request from origin: ${origin}`;
      console.warn(msg);
      console.log('Allowed origins:', allowedOrigins);
      return callback(new Error(msg), false);
    }
    
    console.log(`Allowing CORS request from origin: ${origin}`);
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
  // Allow both transports but prefer WebSocket
  transports: ['websocket', 'polling'],
  // Enable connection state recovery
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
  // Enable per-message deflation
  perMessageDeflate: true,
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

// Track user socket connections and online status
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

  // Extract token from auth, headers, or query
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
    // Initialize userSockets for this user if it doesn't exist
    if (!userSockets[userId]) {
      userSockets[userId] = new Set();
    }
    
    // Add this socket to the user's sockets
    userSockets[userId].add(socket.id);
    
    // Join a room for this user
    socket.join(`user_${userId}`);
    
    console.log(`[Socket.io] User ${userId} connected. Total connections: ${userSockets[userId].size}`);
    console.log(`[Socket.io] Active users: ${Object.keys(userSockets).length}, Total connections: ${Object.values(userSockets).reduce((acc, sockets) => acc + sockets.size, 0)}`);

    try {
      onlineUsers.add(userId);
      await User.findByIdAndUpdate(userId, { 
        online: true, 
        lastSeen: new Date() 
      });
      console.log(`[Socket.io] Updated user ${userId} status to online`);
      io.emit('userStatus', { userId, isOnline: true });
    } catch (err) {
      console.error('[Socket.io] Error updating user status to online:', err);
    }

    // Listen for test messages and echo them back
    socket.on('test', (data) => {
        console.log(`[Socket.io] Test message received from ${socket.id}:`, data);
        // Echo the message back to the sender
        socket.emit('test', {
            ...data,
            serverReceivedAt: new Date().toISOString(),
            originalMessage: 'Echo from server: ' + (data.message || '')
        });
    });

    socket.on('disconnect', async (reason) => {
      console.log(`\n[Socket.io] Socket ${socket.id} disconnected. Reason: ${reason}`);

      if (userId && userSockets[userId]) {
        // Remove this socket from the user's sockets
        userSockets[userId].delete(socket.id);
        
        // If no more sockets for this user, clean up
        if (userSockets[userId].size === 0) {
          delete userSockets[userId];
          onlineUsers.delete(userId);
          
          try {
            await User.findByIdAndUpdate(userId, { 
              online: false, 
              lastSeen: new Date() 
            });
            console.log(`[Socket.io] User ${userId} is now offline`);
            io.emit('userStatus', { 
              userId, 
              isOnline: false,
              lastSeen: new Date()
            });
          } catch (err) {
            console.error('[Socket.io] Error updating user status to offline:', err);
          }
        } else {
          console.log(`[Socket.io] User ${userId} still has ${userSockets[userId].size} active connections`);
        }
      }
    });

    socket.on('getOnlineUsers', (callback) => {
      if (typeof callback === 'function') {
        callback(Array.from(onlineUsers));
      }
    });

    socket.on('sendMessage', async (message, ackCallback) => {
      // Validate required fields
      if (!message.recipientId || !message.content) {
        const error = new Error('Missing required fields: recipientId and content are required');
        console.error('[Socket.io] Validation error:', error.message);
        if (typeof ackCallback === 'function') {
          return ackCallback({ success: false, error: error.message });
        }
        return;
      }

      // Ensure sender is set from socket if not provided
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
        // Create message data with status
        const messageData = {
          senderId: message.senderId,
          recipientId: message.recipientId,
          content: message.content,
          status: 'sent',
          timestamp: new Date()
        };

        // Add taskId if valid
        if (message.taskId && message.taskId !== 'contact' && mongoose.Types.ObjectId.isValid(message.taskId)) {
          messageData.taskId = message.taskId;
        }

        // Save message to database
        const savedMessage = await Message.create(messageData);
        console.log(`[Socket.io] Saved message to database with ID: ${savedMessage._id}`);

        // Prepare message for sending
        const messageToSend = {
          ...savedMessage.toObject(),
          _id: savedMessage._id.toString(),
          senderId: savedMessage.senderId.toString(),
          recipientId: savedMessage.recipientId.toString(),
          timestamp: savedMessage.timestamp ? new Date(savedMessage.timestamp).toISOString() : new Date().toISOString()
        };

        // Send acknowledgment back to sender with the saved message
        if (typeof ackCallback === 'function') {
          ackCallback({ 
            success: true, 
            message: messageToSend,
            status: 'sent'
          });
        }

        // Send to recipient if online
        const recipientSockets = userSockets[message.recipientId];
        if (recipientSockets?.size > 0) {
          console.log(`[Socket.io] Sending to recipient ${message.recipientId}'s ${recipientSockets.size} socket(s)`);
          
          // Emit to recipient's room with a callback for delivery confirmation
          io.to(`user_${message.recipientId}`).emit('newMessage', messageToSend, (response) => {
            if (response?.success) {
              console.log(`[Socket.io] Message ${savedMessage._id} delivered to recipient`);
              // Update message status to delivered
              Message.findByIdAndUpdate(
                savedMessage._id, 
                { status: 'delivered' },
                { new: true }
              ).then(updatedMessage => {
                // Notify sender that message was delivered
                io.to(`user_${message.senderId}`).emit('messageStatusChanged', {
                  messageId: savedMessage._id,
                  status: 'delivered',
                  timestamp: new Date()
                });
              }).catch(err => {
                console.error('[Socket.io] Error updating message status to delivered:', err);
              });
            }
          });
        } else {
          console.log(`[Socket.io] Recipient ${message.recipientId} has no active sockets`);
        }

        // Also send to sender's other tabs/connections
        if (userSockets[message.senderId]?.size > 1) {
          socket.to(`user_${message.senderId}`).emit('newMessage', {
            ...messageToSend,
            status: 'sent' // Only the original sender sees 'sent' status
          });
        }
      } catch (err) {
        console.error('[Socket.io] Error in sendMessage handler:', err);
        if (typeof ackCallback === 'function') {
          ackCallback({ 
            success: false, 
            error: 'Failed to send message',
            details: err.message 
          });
        }
      }
    });

    // Handler for message delivery confirmation
    socket.on('message:delivered', async ({ messageId }, ackCallback) => {
      console.log(`[Socket.io] Received message:delivered for message ${messageId}`);
      
      try {
        if (!messageId) {
          throw new Error('messageId is required');
        }

        // Update message status to 'delivered' in the database
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          { 
            status: 'delivered',
            deliveredAt: new Date(),
            $inc: { __v: 1 } // Increment version
          },
          { new: true }
        );

        if (!updatedMessage) {
          throw new Error('Message not found');
        }

        console.log(`[Socket.io] Message ${messageId} marked as delivered`);

        // Notify the sender that their message was delivered
        const senderId = updatedMessage.senderId?.toString();
        if (senderId && userSockets[senderId]) {
          io.to(`user_${senderId}`).emit('messageStatusChanged', {
            messageId: updatedMessage._id,
            status: 'delivered',
            timestamp: updatedMessage.deliveredAt || new Date()
          });
        }

        // Send acknowledgment to the client
        if (typeof ackCallback === 'function') {
          ackCallback({
            success: true,
            message: 'Message marked as delivered',
            messageId: updatedMessage._id
          });
        }
      } catch (error) {
        console.error('[Socket.io] Error in message:delivered:', error);
        if (typeof ackCallback === 'function') {
          ackCallback({
            success: false,
            error: error.message || 'Failed to update message status'
          });
        }
      }
    });

    // Handler for message read receipt
    socket.on('message:read', async ({ messageId }, ackCallback) => {
      console.log(`[Socket.io] Received message:read for message ${messageId}`);
      
      try {
        if (!messageId) {
          throw new Error('messageId is required');
        }

        // Update message status to 'read' in the database
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          { 
            status: 'read',
            read: true,
            readAt: new Date(),
            $inc: { __v: 1 } // Increment version
          },
          { new: true }
        );

        if (!updatedMessage) {
          throw new Error('Message not found');
        }

        console.log(`[Socket.io] Message ${messageId} marked as read`);

        // Notify the sender that their message was read
        const senderId = updatedMessage.senderId?.toString();
        if (senderId && userSockets[senderId]) {
          io.to(`user_${senderId}`).emit('messageStatusChanged', {
            messageId: updatedMessage._id,
            status: 'read',
            timestamp: updatedMessage.readAt || new Date()
          });
        }

        // Send acknowledgment to the client
        if (typeof ackCallback === 'function') {
          ackCallback({
            success: true,
            message: 'Message marked as read',
            messageId: updatedMessage._id
          });
        }
      } catch (error) {
        console.error('[Socket.io] Error in message:read:', error);
        if (typeof ackCallback === 'function') {
          ackCallback({
            success: false,
            error: error.message || 'Failed to update message status'
          });
        }
      }
    });

    // Handler for marking multiple messages as read
    socket.on('markMessagesAsRead', async ({ messageIds, readerId }, ackCallback) => {
      console.log(`[Socket.io] Received markMessagesAsRead for ${messageIds.length} messages from user ${readerId}`);
      
      try {
        if (!messageIds || !Array.isArray(messageIds) || messageIds.length === 0) {
          throw new Error('messageIds array is required');
        }

        // Update messages to mark them as read in the database
        const result = await Message.updateMany(
          {
            _id: { $in: messageIds },
            recipientId: readerId,
            read: { $ne: true } // Only update if not already read
          },
          {
            $set: {
              read: true,
              readAt: new Date(),
              status: 'read',
              updatedAt: new Date()
            },
            $inc: { __v: 1 } // Increment version for each update
          },
          { multi: true }
        );

        // Get the updated messages to send notifications
        const updatedMessages = await Message.find({
          _id: { $in: messageIds },
          recipientId: readerId
        });

        // Notify senders about read status
        const notifications = updatedMessages.map(async (message) => {
          const senderId = message.senderId?.toString();
          if (senderId && userSockets[senderId]) {
            io.to(`user_${senderId}`).emit('messageStatusChanged', {
              messageId: message._id,
              status: 'read',
              timestamp: message.readAt || new Date()
            });
          }
        });

        // Wait for all notifications to complete
        await Promise.all(notifications);

        console.log(`[Socket.io] Marked ${result.nModified} messages as read for user ${readerId}`);

        // Get the updated messages to send to the sender (lean for better performance)
        const messagesForSender = await Message.find({
          _id: { $in: messageIds },
          recipientId: readerId
        }).lean();

        // Notify the sender that their messages were read
        updatedMessages.forEach(async (message) => {
          const senderId = message.senderId?.toString();
          
          if (senderId && userSockets[senderId]) {
            // Emit to sender's room that their messages were read
            io.to(`user_${senderId}`).emit('messagesRead', {
              messageIds: [message._id],
              readerId,
              readAt: message.readAt || new Date()
            });
            
            // Update message status to 'read' for the sender
            io.to(`user_${senderId}`).emit('messageStatusChanged', {
              messageId: message._id,
              status: 'read',
              timestamp: message.readAt || new Date()
            });
          }
        });

        // Send acknowledgment to the client
        if (typeof ackCallback === 'function') {
          ackCallback({
            success: true,
            updatedCount: result.nModified,
            message: `Marked ${result.nModified} messages as read`
          });
        }
      } catch (error) {
        console.error('[Socket.io] Error in markMessagesAsRead:', error);
        if (typeof ackCallback === 'function') {
          ackCallback({
            success: false,
            error: error.message || 'Failed to mark messages as read'
          });
        }
      }
    });

    // Log all emitted events for debugging
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
