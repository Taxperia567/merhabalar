const LicenseCode = require('../models/LicenseCode');
const License = require('../models/License');

exports.activate = async (req, res) => {
  const { code } = req.body;
  try {
    const lc = await LicenseCode.findOne({ code });
    if (!lc) return res.status(404).json({ msg: 'Kod bulunamadı' });
    if (lc.usedBy) return res.status(400).json({ msg: 'Kod zaten kullanılmış' });

    lc.usedBy = req.user.id;
    lc.usedAt = Date.now();
    await lc.save();

    await License.create({ user: req.user.id, mod: lc.mod });
    res.json({ msg: 'Lisans aktif edildi' });
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};

exports.status = async (req, res) => {
  try {
    const list = await License.find({ user: req.user.id }).populate('mod');
    res.json(list);
  } catch (e) {
    console.error(e); res.status(500).send('Sunucu hatası');
  }
};
