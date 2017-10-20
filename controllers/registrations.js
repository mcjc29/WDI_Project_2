const User = require('../models/user');
function registrationNew(req, res) {
  res.render('registration/new');
}
function registrationCreate(req, res) {
  User
    .create(req.body)
    .then(user => {
      console.log(user);
      res.redirect('/');
    })
  }

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
