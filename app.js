const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var expressLayouts = require('express-ejs-layouts');
const config = require('./src/config/database');
const session = require('express-session');

mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB connected');
});

db.on('error', err => {
  console.log(err);
});

const app = express();
const port = process.env.port || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, './src/views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

//log everything - HTTP request logger middleware
app.use(morgan('combined'));

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Use specific types
// morgan.token('type', function (req, res) { return req.headers['content-type'] })
// app.use(morgan(':type'));

//Handle CORS Errors (Browsers)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //"*" restriction. "*" means everyone can access but we can specify an adress for that, specify in an single page app
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next(); //continue
});

//Set Routes
let mobileApps = require('./src/routes/mobileApps');
let appUsers = require('./src/routes/appUsers');
let users = require('./src/routes/users');
let index = require('./src/routes/index');
app.use('/mobileApps', mobileApps);
app.use('/appUsers', appUsers);
app.use('/users', users);
app.use('/clientSide', index);

//Error handling bottom stack
let { logErrors, clientErrorHandler } = require('./src/middleware/errors');
app.use(logErrors);

app.listen(port, () => console.log(`App started on port ${port}`));
