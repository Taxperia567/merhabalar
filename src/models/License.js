const mongoose = require('mongoose');
const LicenseSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mod:         { type: mongoose.Schema.Types.ObjectId, ref: 'Mod', required: true },
  activatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('License', LicenseSchema);
