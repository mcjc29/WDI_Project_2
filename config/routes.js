const router = require('express').Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const servicesController = require('../controllers/services');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('statics/homepage'));

router.route('/services')
  .get(servicesController.index)
  .post(secureRoute, servicesController.create);

router.route('/services/categories/:category')
  .get(servicesController.index);

router.route('/services/new')
  .get(secureRoute, servicesController.new);

router.route('/services/:id')
  .get(servicesController.show)
  .put(secureRoute, servicesController.update)
  .delete(secureRoute, servicesController.delete);

router.route('/services/:id/edit')
  .get(secureRoute, servicesController.edit);

router.route('/services/:id/comments')
  .post(secureRoute, servicesController.createComment);

router.route('/services/:id/comments/:commentId')
  .delete(secureRoute, servicesController.deleteComment);

router.route('/services/:id/ratings')
  .post(secureRoute, servicesController.createRating);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/profile')
  .get(secureRoute, registrationsController.show)
  .put(secureRoute, registrationsController.update)
  .delete(secureRoute, registrationsController.delete);

router.route('/profile/:id/edit')
  .get(secureRoute, registrationsController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
