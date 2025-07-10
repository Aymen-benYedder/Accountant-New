// Category model, CommonJS, JavaScript-only

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', CategorySchema);