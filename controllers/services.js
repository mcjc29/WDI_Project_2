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
    .populate('createdBy comments.createdBy ratings.createdBy')
    .exec()
    .then(service => {
      if(!service) return res.notFound();
      if (service.ratings.length > 0) {
        const averageDignity = [];
        const averageAdvice = [];
        const averageFacilities = [];
        for (var i = 0; i < service.ratings.length; i++) {
          const rating = service.ratings[i];
          averageDignity.push(parseInt(rating.dignity));
          averageAdvice.push(parseInt(rating.advice));
          averageFacilities.push(parseInt(rating.facilities));
        }

        const avgRatingDig = { name: 'dignity', avg: average(averageDignity) };
        const avgRatingAdv = { name: 'advice', avg: average(averageAdvice) };
        const avgRatingFac = { name: 'facilities', avg: average(averageFacilities) };

        service.averageRatings = [avgRatingDig];
        service.averageRatings = [avgRatingAdv];
        service.averageRatings = [avgRatingFac];
        service.save();

      }

      function average(toDo) {
        const sum = toDo.reduce((previous, current) => current += previous);
        const result = Math.round( (sum/toDo.length) * 10 ) / 10;
        console.log(result);
        return result;
      }

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

function createRatingRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      if (!service) return res.notFound();
      req.body.createdBy = req.session.userId;
      service.ratings.push(req.body);
      return service.save();
    })
    .then(() => res.redirect(`/services/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/services/${req.params.id}`, err.toString());
      next(err);
    });
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
  deleteComment: deleteCommentRoute,
  createRating: createRatingRoute
};
