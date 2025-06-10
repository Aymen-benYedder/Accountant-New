// Broadcasts router/controller - military minimal JS

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const BroadcastMessage = require('../models/BroadcastMessage');

const router = express.Router();

// List all broadcast messages
router.get('/', jwtAuth, async (req, res) => {
  try {
    const messages = await BroadcastMessage.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch broadcasts' });
  }
});

// Create a new broadcast
router.post('/', jwtAuth, async (req, res) => {
  const { content, recipientIds } = req.body;
  if (!content || !recipientIds || !recipientIds.length) {
    return res.status(400).json({ error: 'Content and at least 1 recipient required' });
  }
  try {
    const message = await BroadcastMessage.create({
      content: content.trim(),
      createdBy: req.user.id,
      recipientIds,
      sentAt: new Date()
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create broadcast' });
  }
});

module.exports = router;