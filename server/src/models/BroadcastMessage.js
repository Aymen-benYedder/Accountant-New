// BroadcastMessage model, minimal but robust

const mongoose = require('mongoose');
const { Schema } = mongoose;

const BroadcastMessageSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true, maxlength: 1000 },
  recipientIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  sentAt: { type: Date, default: Date.now }
}, { timestamps: false });

module.exports = mongoose.model('BroadcastMessage', BroadcastMessageSchema);