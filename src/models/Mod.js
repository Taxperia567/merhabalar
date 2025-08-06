const mongoose = require('mongoose');

const ModSchema = new mongoose.Schema({
  name: String,
  version: String,
  description: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mod', ModSchema);
