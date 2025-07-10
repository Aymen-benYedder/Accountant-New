// Subscriptions router/controller hybrid - ultra-minimal, bulletproof JS

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const SubscriptionPlan = require('../models/SubscriptionPlan');

const router = express.Router();

// List all subscription plans
router.get('/', jwtAuth, async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscription plans' });
  }
});

// Create a new subscription plan
router.post('/', jwtAuth, async (req, res) => {
  const { name, clientLimit, storageLimitGB, pricePerClient, billingCycle } = req.body;
  if (!name || !clientLimit || !storageLimitGB || !pricePerClient || !billingCycle) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const plan = await SubscriptionPlan.create({ name, clientLimit, storageLimitGB, pricePerClient, billingCycle });
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create subscription plan' });
  }
});

module.exports = router;