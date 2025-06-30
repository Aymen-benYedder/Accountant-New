// Message model, minimal, bulletproof CommonJS

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  //add seen boolean 
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: false },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { 
    type: String, 
    enum: ['sending', 'sent', 'delivered', 'read', 'error'],
    default: 'sending'
  },
  read: { type: Boolean, default: false },
  readAt: { type: Date },
  deliveredAt: { type: Date },
  error: { type: String },
  timestamp: { type: Date, default: Date.now },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
MessageSchema.index({ senderId: 1, status: 1 });
MessageSchema.index({ recipientId: 1, read: 1 });
MessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);