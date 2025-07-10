// Task model, CommonJS, JavaScript-only

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  deadline: { type: Date },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  // Add other relevant fields as needed
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', TaskSchema);