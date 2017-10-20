const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const routes = require('./config/routes');
const User = require('./models/user');
const session = require('express-session');
const flash = require('express-flash');

//settings
const app = express();
const { port, dbUri, sessionSecret } = require('./config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useMongoClient: true });

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(authentication);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log('express up'));
