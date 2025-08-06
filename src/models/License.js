const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mod: { type: mongoose.Schema.Types.ObjectId, ref: 'Mod' },
  code: String,
  activatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('License', LicenseSchema);
