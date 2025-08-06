const router = require('express').Router();
const { check } = require('express-validator');
const ctl = require('../controllers/authController');

router.post(
  '/register',
  [ check('email').isEmail(), check('password').isLength({ min: 6 }) ],
  ctl.register
);

router.post(
  '/login',
  [ check('email').isEmail(), check('password').exists() ],
  ctl.login
);

module.exports = router;
