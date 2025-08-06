const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post(
  '/register',
  [check('email', 'Valid email required').isEmail(), check('password', 'Min 6 chars').isLength({ min: 6 })],
  register
);

router.post(
  '/login',
  [check('email', 'Valid email required').isEmail(), check('password', 'Password required').exists()],
  login
);

module.exports = router;
