const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

  const { email, password } = req.body;
  try {
    let u = await User.findOne({ email });
    if (u) return res.status(400).json({ msg: 'Bu e-posta zaten kayıtlı' });

    const hashed = await bcrypt.hash(password, 10);
    u = new User({ email, password: hashed });
    await u.save();

    const payload = { user: { id: u.id, isAdmin: u.isAdmin } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};

exports.login = async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

  const { email, password } = req.body;
  try {
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ msg: 'Geçersiz kimlik' });

    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(400).json({ msg: 'Geçersiz kimlik' });

    const payload = { user: { id: u.id, isAdmin: u.isAdmin } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};
