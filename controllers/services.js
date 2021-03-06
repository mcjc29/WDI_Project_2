const Service = require('../models/service');
let averageRatingsNum;
let averageDisplay;
function indexRoute(req, res, next) {
  console.log(req.params.category);
  Service
    .find()
    .populate('createdBy')
    .exec()
    .then((services) => {
      const filteredServices = services.filter(service => {
        return service.category.includes(req.params.category);
      });

      // console.log(filteredServices);
      res.render('services/index', { filteredServices });
    })
    .catch(next);
}

function newRoute(req, res) {
  return res.render('services/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  Service
    .create(req.body)
    .then((service) => {
      console.log(service);
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/services/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
// console.log(req.params.id);
  Service
    .findById(req.params.id)
    .populate('createdBy comments.createdBy ratings.createdBy')
    .exec()
    .then(service => {
      if(!service) return res.notFound();
      let avgOfAverages = null;
      if (service.ratings.length > 0) {
        const averageAll = [[], [], []];
        for (var i = 0; i < service.ratings.length; i++) {
          const rating = service.ratings[i];
          if (rating.dignity) averageAll[0].push(parseInt(rating.dignity));
          if (rating.advice) averageAll[1].push(parseInt(rating.advice));
          if (rating.facilities) averageAll[2].push(parseInt(rating.facilities));
        }

        const avgRatingDig = { name: 'Dignity and Respect', avg: average(averageAll[0]) };
        const avgRatingAdv = { name: 'Quality of Advice', avg: average(averageAll[1]) };
        const avgRatingFac = { name: 'Quality of facilities', avg: average(averageAll[2]) };

        service.averageRatings = [avgRatingDig, avgRatingAdv, avgRatingFac];
        service.save();
        // console.log(service);
        averageRatingsNum = [avgRatingDig.avg, avgRatingAdv.avg, avgRatingFac.avg];
        avgOfAverages = average(averageRatingsNum);
      }

      function average(toDo) {
        if (toDo.length > 0) {
          const sum = toDo.reduce((previous, current) => current += previous);
          const result = Math.round( (sum/toDo.length) * 10 ) / 10;
          return result;
        } else {
          return 0;
        }
      }

      return res.render('services/show', { service, avgOfAverages });
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
      const comment = service.comments.id(req.params.commentId);
      comment.remove();

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
