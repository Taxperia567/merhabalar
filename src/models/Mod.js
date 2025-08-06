const mongoose = require('mongoose');
const ModSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  description:   { type: String },
  version:       { type: String },
  downloadUrl:   { type: String },          // örn: "/uploads/abcdef.zip"
  allowedUsers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublic:      { type: Boolean, default: false },
  createdAt:     { type: Date, default: Date.now }
});
module.exports = mongoose.model('Mod', ModSchema);
