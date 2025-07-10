// AuditLog model, ultra-minimal and robust

const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuditLogSchema = new Schema({
  entityType: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId, required: true },
  action: { type: String, required: true },
  changes: { type: Schema.Types.Mixed },
  performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: false });

module.exports = mongoose.model('AuditLog', AuditLogSchema);