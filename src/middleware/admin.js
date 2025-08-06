module.exports = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ msg: 'Admin yetkisi gerekli' });
  }
  next();
};
