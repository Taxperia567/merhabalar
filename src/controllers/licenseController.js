const License = require('../models/License');
const Mod = require('../models/Mod');

exports.activate = async (req, res) => {
  // TODO: check code validity, link to user
  res.status(501).json({ msg: 'Not implemented' });
};

exports.status = async (req, res) => {
  try {
    const licenses = await License.find({ user: req.user.id }).populate('mod');
    res.json(licenses);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
