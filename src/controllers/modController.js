const Mod = require('../models/Mod');
const License = require('../models/License');

exports.list = async (req, res) => {
  try {
    const mods = await Mod.find();
    res.json(mods);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.get = async (req, res) => {
  try {
    const mod = await Mod.findById(req.params.id);
    if (!mod) return res.status(404).json({ msg: 'Mod not found' });
    res.json(mod);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.create = async (req, res) => {
  // TODO: admin-only, validation
  try {
    const mod = new Mod(req.body);
    await mod.save();
    res.status(201).json(mod);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.update = async (req, res) => {
  // TODO: admin-only
  try {
    let mod = await Mod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mod) return res.status(404).json({ msg: 'Mod not found' });
    res.json(mod);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.remove = async (req, res) => {
  // TODO: admin-only
  try {
    await Mod.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Mod removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.download = async (req, res) => {
  // TODO: validate license, then stream encrypted file
  res.status(501).json({ msg: 'Not implemented' });
};
