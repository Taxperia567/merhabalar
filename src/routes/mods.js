const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const ctl = require('../controllers/modController');

// mod yüklemek için admin + multer upload
router.post('/', auth, admin, ctl.upload.single('file'), ctl.create);

router.get('/', auth, ctl.list);
router.get('/:id', auth, ctl.get);
router.get('/download/:id', auth, ctl.download);

// (isteğe bağlı) admin için güncelle/sil
module.exports = router;
