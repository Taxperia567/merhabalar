const fs = require('fs');
const path = require('path');
const Mod = require('../models/Mod');
const License = require('../models/License');

// Multer setup
const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
exports.upload = multer({ storage });

exports.create = async (req, res) => {
  // Admin middleware ile korunacak
  const { name, description, version, isPublic, allowedUsers } = req.body;
  if (!req.file) return res.status(400).json({ msg: 'Dosya gerekli' });

  try {
    const downloadUrl = `/uploads/${req.file.filename}`;
    const mod = new Mod({ name, description, version, downloadUrl, isPublic, allowedUsers });
    await mod.save();
    res.status(201).json(mod);
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};

exports.list = async (req, res) => {
  try {
    const all = await Mod.find();
    // public veya kullanıcıya atanmış olanları filtrele
    const visible = all.filter(m =>
      m.isPublic || m.allowedUsers.includes(req.user.id)
    );
    res.json(visible);
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};

exports.get = async (req, res) => {
  try {
    const m = await Mod.findById(req.params.id);
    if (!m) return res.status(404).json({ msg: 'Mod bulunamadı' });
    if (!m.isPublic && !m.allowedUsers.includes(req.user.id)) {
      return res.status(403).json({ msg: 'İzin yok' });
    }
    res.json(m);
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};

exports.download = async (req, res) => {
  try {
    const m = await Mod.findById(req.params.id);
    if (!m) return res.status(404).json({ msg: 'Mod bulunamadı' });
    if (!m.isPublic && !m.allowedUsers.includes(req.user.id)) {
      return res.status(403).json({ msg: 'İzin yok' });
    }
    const filePath = path.join(__dirname, '../', m.downloadUrl);
    // İleride hash eklenebilir
    res.download(filePath);
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};

// Admin için güncelle ve silme metotlarını da ekleyebilirsiniz
