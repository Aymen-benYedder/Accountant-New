// ClientProfile model, CommonJS, JavaScript-only

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientProfileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String },
  phone: { type: String },
  address: { type: String },
  // Add other relevant fields here!
}, {
  timestamps: true,
});

module.exports = mongoose.model('ClientProfile', ClientProfileSchema);