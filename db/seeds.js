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
    email: 'person@person.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Service
      .create([{
        name: 'Women\'s Health & Family Services',
        category: 'Pregnancy Support',
        categoryIcon: '',
        address: {
          line1: 'Brady Arts Centre,',
          line2: 'Hanbury St,',
          city: 'London',
          postcode: 'E1 5HU'
        },
        image: 'http://www.whfs.org.uk/images/logos/WHFS_new_logo.png',
        number: '020 7377 8725',
        website: 'http://www.whfs.org.uk/',
        rating: 3,
        createdBy: users[0]
      }, {
        name: 'The Gynae Centre',
        category: 'Sexual Health Advice',
        categoryIcon: '',
        address: {
          line1: 'Suite 23, Milford House,',
          line2: '7 Queen Anne Street,',
          city: 'London',
          postcode: 'W1G 9HN'
        },
        image: 'http://www.gynae-centre.co.uk/wp-content/themes/republica/images/logo.png',
        website: 'http://www.whfs.org.uk/',
        number: '020 7580 8090',
        rating: 3,
        createdBy: users[0]
      }, {
        name: 'Brixton Advice Center',
        category: 'Domestic Abuse',
        categoryIcon: '',
        address: {
          line1: '167 Railton Road,',
          line2: 'Brixton,',
          city: 'London',
          postcode: 'SE24 0LU'
        },
        image: 'https://brixtonadvice.files.wordpress.com/2015/08/150809bac.png',
        website: 'http://www.whfs.org.uk/',
        number: '0800 254 0298',
        rating: 3,
        createdBy: users[0]
      }]);
  })
  .then((services) => console.log(`${services.length} services created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
