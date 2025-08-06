const mongoose = require('mongoose');
const LicenseCodeSchema = new mongoose.Schema({
  code:        { type: String, required: true, unique: true },
  mod:         { type: mongoose.Schema.Types.ObjectId, ref: 'Mod', required: true },
  usedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  usedAt:      { type: Date }
});
module.exports = mongoose.model('LicenseCode', LicenseCodeSchema);
