const User = require('../models/User');
const LicenseCode = require('../models/LicenseCode');
const Mod = require('../models/Mod');

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.listLicenses = async (req, res) => {
  const codes = await LicenseCode.find().populate('mod usedBy');
  res.json(codes);
};

exports.generateCode = async (req, res) => {
  const { modId, code } = req.body;
  const exists = await LicenseCode.findOne({ code });
  if (exists) return res.status(400).json({ msg: 'Kod zaten var' });
  const lc = await LicenseCode.create({ code, mod: modId });
  res.status(201).json(lc);
};

// Mod atama: 
exports.assignMod = async (req, res) => {
  const { modId, userId } = req.body;
  const m = await Mod.findById(modId);
  if (!m) return res.status(404).json({ msg: 'Mod bulunamadı' });
  if (!m.allowedUsers.includes(userId)) {
    m.allowedUsers.push(userId);
    await m.save();
  }
  res.json(m);
};
