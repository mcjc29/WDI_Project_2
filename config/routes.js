const router = require('express').Router();

const statics = require('../controllers/statics');

router.route('/')
  .get(statics.index);

module.exports = router;
