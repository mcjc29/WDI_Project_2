const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');

mongoose.Promise     = require('bluebird');
const routes = require('./config/routes');
// const User           = require('./models/user');
const session        = require('express-session');
const flash     = require('express-flash');
const { port } = require('./config/environment');


//settings
const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => console.log('express up'));
