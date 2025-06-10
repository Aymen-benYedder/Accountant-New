// Message model, minimal, bulletproof CommonJS

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  //add seen boolean 
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: false },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true, maxlength: 500 },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: false });

module.exports = mongoose.model('Message', MessageSchema);