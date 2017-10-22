const Service = require('../models/service');

function indexRoute(req, res, next) {
  Service
    .find()
    .populate('createdBy')
    .exec()
    .then((services) => res.render('services/index', { services }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('services/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Service
    .create(req.body)
    .then(() => res.redirect('/services'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/services/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(service => {
      if(!service) return res.notFound();
      return res.render('services/show', { service });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      if(!service) return res.redirect();
      if(!service.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
      return res.render('services/edit', { service });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      if(!service) return res.notFound();
      if(!service.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');

      for(const field in req.body) {
        service[field] = req.body[field];
      }

      return service.save();
    })
    .then(() => res.redirect(`/services/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/services/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      if(!service) return res.notFound();
      if(!service.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      return service.remove();
    })
    .then(() => res.redirect('/services'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      if (!service) return res.notFound();

      req.body.createdBy = req.user;
      service.comments.push(req.body);

      return service.save();
    })
    .then(() => res.redirect(`/services/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/services/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      if (!service) return res.notFound();
      if (!service.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      service.comments.id(req.params.commentId).remove();

      return service.save();
    })
    .then(service => res.redirect(`/services/${service.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
