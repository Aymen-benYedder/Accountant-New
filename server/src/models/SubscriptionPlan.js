// SubscriptionPlan model, military-grade minimal JS

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionPlanSchema = new Schema({
  name: { type: String, required: true },
  clientLimit: { type: Number, required: true, min: 1 },
  storageLimitGB: { type: Number, required: true, min: 1 }, // limit on file size not on global 
  pricePerClient: { type: Number, required: true, min: 0 },
  billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);


//subscription or not active  by admin on each user