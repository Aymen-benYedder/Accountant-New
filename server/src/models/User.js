// User model, CommonJS, JavaScript-only

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'accountant', 'owner'], default: 'accountant' },
  profile_pic: { type: String, default: '' }, // Add profile_pic field
  // Track who created this user (for 'accountant' ownership)
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  // Array of company ObjectIds referencing companies owned by this user
  companies: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  online: { type: Boolean, default: false },
  firebaseToken: { type: String, default: null },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);