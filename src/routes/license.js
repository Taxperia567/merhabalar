const router = require('express').Router();
const auth = require('../middleware/auth');
const ctl = require('../controllers/licenseController');

router.post('/activate', auth, ctl.activate);
router.get('/status', auth, ctl.status);

module.exports = router;
