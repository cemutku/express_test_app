const bcrypt = require('bcrypt');
var passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/user');

passport.use(
  new Strategy(function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.',
          type: 'danger'
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        if (!result) {
          return done(null, false, {
            type: 'danger',
            message: 'Incorrect Credentials'
          });
        } else {
          return done(null, user);
        }
      });
    });
  })
);

//Stores user in session
passport.serializeUser(function(user, done) {
  done(null, user.id); //Hold the user id -Do not store entire user
});

//Retrieves user from session
passport.deserializeUser(function(userId, done) {
  User.findById(userId, function(err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

// app.use(passport.initialize()); ->  creates stuff in req object. isAuthenticated() is one of them
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('danger', 'Please log in to view this resource');
  res.redirect('/clientSide/login');
}

module.exports = {
  passport,
  isLoggedIn
};
