// AuditLogs router/controller - ultra-minimal, secure JS

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

// List all audit logs (paginated)
router.get('/', jwtAuth, async (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  try {
    const logs = await AuditLog.find()
      .sort({ timestamp: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// Create a new audit log entry (for system/internal use)
router.post('/', jwtAuth, async (req, res) => {
  const { entityType, entityId, action, changes } = req.body;
  if (!entityType || !entityId || !action) {
    return res.status(400).json({ error: 'entityType, entityId, and action required' });
  }
  try {
    const log = await AuditLog.create({
      entityType, entityId, action, changes, performedBy: req.user.id, timestamp: new Date()
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create audit log' });
  }
});

module.exports = router;