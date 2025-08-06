const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const ctl = require('../controllers/adminController');

router.get('/users', auth, admin, ctl.listUsers);
router.get('/license-codes', auth, admin, ctl.listLicenses);
router.post('/license-codes', auth, admin, ctl.generateCode);
router.post('/mods/assign', auth, admin, ctl.assignMod);

module.exports = router;
