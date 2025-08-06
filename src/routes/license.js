const express = require('express');
const auth = require('../middleware/auth');
const { activate, status } = require('../controllers/licenseController');
const router = express.Router();

router.post('/activate', auth, activate);
router.get('/status', auth, status);

module.exports = router;
