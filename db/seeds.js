const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const Service = require('../models/service');
const User = require('../models/user');
// Drop the model
Service.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Martha',
    lastName: 'Chambers',
    username: 'MC',
    email: 'martha.chambers@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Service
      .create([{
        name: 'Women\'s Health & Family Services',
        address: {
          line1: 'Brady Arts Centre, Hanbury St,',
          city: 'London',
          postcode: 'E1 5HU'
        },
        image: 'www#',
        website: 'http://www.whfs.org.uk/',
        stars: 3
      }]);
  })
  .then((services) => console.log(`${services.length} services created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
