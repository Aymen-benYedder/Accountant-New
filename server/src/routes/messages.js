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

// Send a message
router.post('/', jwtAuth, async (req, res) => {
  const { taskId, recipientId, content } = req.body;
  const io = req.app.get('io');
  const userSockets = req.app.get('userSockets');

  // Input Validation
  if (!recipientId || !content || content.trim() === '') {
    return res.status(400).json({ error: 'recipientId and content are required' });
  }

  // Sanitize content
  const sanitizedContent = content.trim();

  // Log request for auditing
  console.log(`Received message request from user ${req.user.id}. Task ID: ${taskId || 'None'}, Recipient ID: ${recipientId}`);

  // Perform recipient validation
  if (req.user.id === recipientId) {
    return res.status(400).json({ error: 'You cannot send a message to yourself' });
  }

  try {
    // If no taskId is provided, use null or a default value (optional)
    // ensure taskId is a valid ObjectId, otherwise set null
    const mongoose = require('mongoose');
    let messageTaskId = null;
    if (taskId && mongoose.Types.ObjectId.isValid(taskId)) {
      messageTaskId = taskId;
    }

    // Log message creation attempt
    console.log(`Attempting to create a message from user ${req.user.id} to recipient ${recipientId}`);

    // Check if recipient exists in database
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      console.error(`Recipient ID ${recipientId} not found. Sender ID: ${req.user.id}`);
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Save the message to the database
    const msg = await Message.create({
      taskId: messageTaskId,
      senderId: req.user.id,
      recipientId,
      content: sanitizedContent
    });

    // Populate sender info for the client
    const populatedMsg = await Message.findById(msg._id).populate('senderId', 'name email');

    // Log successful message creation
    console.log(`Message successfully created from user ${req.user.id} to recipient ${recipientId}. Message ID: ${msg.id}`);

    // Broadcast the message to the recipient
    if (userSockets[recipientId]) {
      userSockets[recipientId].forEach(socketId => {
        io.to(socketId).emit('newMessage', populatedMsg);
      });
    }
    
    // Also send to sender's other tabs
    if (userSockets[req.user.id]) {
      userSockets[req.user.id].forEach(socketId => {
        io.to(socketId).emit('newMessage', populatedMsg);
      });
    }

    // Respond with the created message
    res.status(201).json(populatedMsg);

  } catch (err) {
    // Log error
    console.error(`Error occurred while sending message from user ${req.user.id}: ${err.message}`);

    // Send appropriate error response
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;