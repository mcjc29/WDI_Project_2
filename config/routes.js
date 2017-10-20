const router = require('express').Router();

const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

router.route('/')
  .get(statics.home);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// router.route('/session')
// .get(sessions.new);

// A home route
// router.get('/', (req, res) => res.render('homepage'));

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// INDEX

// NEW

// SHOW

// CREATE

// EDIT

// UPDATE

// DELETE

module.exports = router;
