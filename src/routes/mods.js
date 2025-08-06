const express = require('express');
const auth = require('../middleware/auth');
const {
  list,
  get,
  create,
  update,
  remove,
  download
} = require('../controllers/modController');
const router = express.Router();

router.get('/', auth, list);
router.get('/:id', auth, get);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);
router.get('/:id/download', auth, download);

module.exports = router;
