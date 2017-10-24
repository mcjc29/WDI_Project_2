const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Service = require('../models/service');
// Drop the model
User.collection.drop();
Service.collection.drop();

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
        createdBy: users[0]
      }, {
        name: 'Ambrose King Sexual Health Centre',
        category: 'Sexual Health',
        categoryIcon: '',
        address: {
          line1: 'The Royal London Hospital,',
          line2: 'Mount Terrace, Whitechapel,',
          city: 'London',
          postcode: 'E1 2BB'
        },
        image: 'https://www.bartshealth.nhs.uk/base-install/images/main-logo/company-logo.png',
        website: 'https://www.bartshealth.nhs.uk/sexual-health',
        number: '020 7377 7307',
        createdBy: users[0]
      }, {
        name: 'East London Rape Crisis Service',
        category: 'Sexual Assult',
        categoryIcon: '',
        address: {
          line1: 'PO Box 58203,',
          line2: '',
          city: 'London',
          postcode: 'N1 3XP'
        },
        image: 'http://www.niaendingviolence.org.uk/images/niaendingviolence-logo.svg',
        website: 'https://www.bartshealth.nhs.uk/sexual-health',
        number: '020 7683 1270',
        createdBy: users[0]
      }, {
        name: 'Solace Women\'s Aid',
        category: 'Sexual Assult',
        categoryIcon: '',
        address: {
          line1: 'Unit 5-7, Blenheim Court',
          line2: '62 Brewery Road,',
          city: 'London',
          postcode: 'N7 9NY'
        },
        image: 'http://solacewomensaid.org/wp-content/themes/solace/images/logo.png',
        website: 'http://solacewomensaid.org/',
        number: '0808 802 5565',
        createdBy: users[0]
      }, {
        name: 'Burrell Street Clinic',
        category: 'Contraception, Sexual Health',
        categoryIcon: '',
        address: {
          line1: '4-6 Burrell Street,',
          line2: 'Blackfriars',
          city: 'London',
          postcode: 'SE1 0UN'
        },
        image: 'http://www.guysandstthomas.nhs.uk/images/s/sexual-health/sexual-health-logos/burrell-street.png',
        website: 'http://www.guysandstthomas.nhs.uk/our-services/sexual-health/clinics/burrell-street/patients.aspx',
        number: '020 7188 6666',
        createdBy: users[0]
      }, {
        name: 'Step Forward',
        category: 'Pregnancy Support',
        categoryIcon: '',
        address: {
          line1: '234 Bethnal Green Road,',
          line2: '',
          city: 'London',
          postcode: 'E2 0AA'
        },
        image: 'http://www.step-forward.org/wp-content/uploads/2015/03/sf-logo.png',
        website: 'http://www.step-forward.org/services/',
        number: '020 7739 3082',
        createdBy: users[0]
      }]);
  })
  .then((services) => console.log(`${services.length} services created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
