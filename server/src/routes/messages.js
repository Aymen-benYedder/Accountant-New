// Messages router/controller hybrid - military grade minimal JS

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const Message = require('../models/Message');
const User = require('../models/User');

const router = express.Router();

// Get messages for a task or between two users
router.get('/', jwtAuth, async (req, res) => {
  const { taskId, withUser } = req.query;
  let filter = {};
  if (taskId) filter.taskId = taskId;
  if (withUser) {
    if (withUser === 'all') {
      // Show all user conversations (i.e., all their sent/received messages)
      filter.$or = [
        { senderId: req.user.id },
        { recipientId: req.user.id }
      ];
    } else {
      const mongoose = require('mongoose');
      const userId = mongoose.Types.ObjectId.isValid(req.user.id)
        ? new mongoose.Types.ObjectId(req.user.id)
        : req.user.id;
      const otherId = mongoose.Types.ObjectId.isValid(withUser)
        ? new mongoose.Types.ObjectId(withUser)
        : withUser;
      filter.$or = [
        { senderId: userId, recipientId: otherId },
        { senderId: otherId, recipientId: userId }
      ];
    }
  }
  try {
    const msgs = await Message.find(filter).sort({ timestamp: 1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a message - DEPRECATED: Use WebSocket sendMessage event instead
router.post('/', jwtAuth, async (req, res) => {
  try {
    const { taskId, recipientId, content } = req.body;
    const io = req.app.get('io');
    
    // Log deprecation warning
    console.warn(`[DEPRECATED] HTTP POST /api/messages called. Client should use WebSocket sendMessage event instead.`);
    
    // Input Validation
    if (!recipientId || !content || content.trim() === '') {
      return res.status(400).json({ 
        success: false,
        error: 'recipientId and content are required',
        deprecated: true,
        message: 'This endpoint is deprecated. Please use the WebSocket sendMessage event instead.'
      });
    }

    // Sanitize content
    const sanitizedContent = content.trim();

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ 
        success: false,
        error: 'Recipient not found',
        deprecated: true
      });
    }

    // Create message data matching WebSocket format
    const messageData = {
      recipientId,
      content: sanitizedContent,
      taskId: taskId || undefined,
      senderId: req.user.id,
      timestamp: new Date()
    };

    // Emit the message via WebSocket
    return new Promise((resolve) => {
      io.to(`user_${req.user.id}`).emit('sendMessage', messageData, (response) => {
        if (response.success) {
          res.status(201).json({
            ...response.message,
            _warning: 'This endpoint is deprecated. Please use the WebSocket sendMessage event instead.'
          });
        } else {
          res.status(500).json({
            success: false,
            error: response.error || 'Failed to send message',
            deprecated: true
          });
        }
        resolve();
      });
      
      // Set a timeout in case the client doesn't respond
      setTimeout(() => {
        if (!res.headersSent) {
          res.status(504).json({
            success: false,
            error: 'Message send timeout',
            deprecated: true,
            message: 'The message could not be sent. Please try again or check your WebSocket connection.'
          });
          resolve();
        }
      }, 5000);
    });
  } catch (err) {
    console.error('Error in deprecated message endpoint:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      deprecated: true,
      details: err.message 
    });
  }
});

// Mark messages as read - DEPRECATED: Use WebSocket markMessagesAsRead event instead
router.post('/mark-as-read', jwtAuth, async (req, res) => {
  try {
    const { messageIds } = req.body;
    const io = req.app.get('io');
    
    // Log deprecation warning
    console.warn(`[DEPRECATED] HTTP POST /api/messages/mark-as-read called. Use WebSocket markMessagesAsRead event instead.`);
    
    if (!messageIds || !Array.isArray(messageIds) || messageIds.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'messageIds array is required',
        deprecated: true
      });
    }

    // Emit the mark as read event via WebSocket
    return new Promise((resolve) => {
      io.to(`user_${req.user.id}`).emit('markMessagesAsRead', { 
        messageIds,
        readerId: req.user.id 
      }, (response) => {
        if (response.success) {
          res.json({
            ...response,
            _warning: 'This endpoint is deprecated. Please use the WebSocket markMessagesAsRead event instead.'
          });
        } else {
          res.status(500).json({
            success: false,
            error: response.error || 'Failed to mark messages as read',
            deprecated: true
          });
        }
        resolve();
      });
      
      // Set a timeout in case the client doesn't respond
      setTimeout(() => {
        if (!res.headersSent) {
          res.status(504).json({
            success: false,
            error: 'Mark as read operation timed out',
            deprecated: true,
            message: 'The operation could not be completed. Please try again or check your WebSocket connection.'
          });
          resolve();
        }
      }, 5000);
    });
  } catch (err) {
    console.error('Error in deprecated mark-as-read endpoint:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      deprecated: true,
      details: err.message 
    });
  }
});

module.exports = router;