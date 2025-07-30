// TaskDocument model for files uploaded for tasks
// CommonJS, JavaScript-only

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskDocumentSchema = new Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number },
  path: { type: String, required: true }, // relative storage path
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // who uploaded
  description: { type: String, default: '' },
}, {
  timestamps: true,
});

// Indexes for better performance
TaskDocumentSchema.index({ task: 1 });
TaskDocumentSchema.index({ uploadedBy: 1 });

module.exports = mongoose.model('TaskDocument', TaskDocumentSchema);