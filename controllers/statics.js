const User = require('../models/user');

function staticsHome(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('/services', { users }));
}

module.exports = {
  index: staticsHome
};
