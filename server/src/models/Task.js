// Task model, CommonJS, JavaScript-only

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  // Task type: 'file_upload' or 'mission'
  type: {
    type: String,
    enum: ['file_upload', 'mission'],
    required: true
  },
  
  // Relationships
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // accountant who created
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // client (owner)
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'submitted', 'under_review', 'completed', 'rejected'],
    default: 'pending'
  },
  
  // Dates
  deadline: { type: Date },
  submittedAt: { type: Date },
  reviewedAt: { type: Date },
  completedAt: { type: Date },
  
  // File upload requirements (for file_upload type)
  requiredFileTypes: [{ type: String }], // e.g., ['pdf', 'jpg', 'png']
  maxFileSize: { type: Number, default: 10485760 }, // 10MB default
  allowMultipleFiles: { type: Boolean, default: true },
  
  // Review and feedback
  reviewNotes: { type: String },
  clientNotes: { type: String },
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Legacy fields for backward compatibility
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
}, {
  timestamps: true,
});

// Indexes for better performance
TaskSchema.index({ createdBy: 1, status: 1 });
TaskSchema.index({ assignedTo: 1, status: 1 });
TaskSchema.index({ company: 1 });
TaskSchema.index({ deadline: 1 });

module.exports = mongoose.model('Task', TaskSchema);