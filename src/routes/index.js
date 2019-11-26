const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const MobileApp = require('../models/mobileApp');
const User = require('../models/user');
const { passport, isLoggedIn } = require('../middleware/passport');

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

//Login Process
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/clientSide/home',
    failureRedirect: '/clientSide/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/clientSide/login');
});

router.get('/register', (req, res) => {
  res.render('register', { user: req.user });
});

const {
  registerValidationRules,
  validate
} = require('../middleware/clientValidator');
router.post(
  '/register',
  registerValidationRules(),
  validate,
  (req, res, next) => {
    const { email, password } = req.body;
    User.find({ email: email })
      .then(doc => {
        if (doc.length > 0) {
          req.flash('danger', 'Email used before');
          res.render('register', { email, user: req.user });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              res.render('register', { email, user: req.user });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  req.flash('success', 'You are now able to login');
                  res.redirect('/clientSide/login');
                })
                .catch(err => {
                  req.flash('danger', err.message);
                  res.render('register', { user: req.user });
                  next();
                });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//another syntax async ((){}())
router.get('/home', isLoggedIn, (req, res, next) => {
  (async function query() {
    try {
      const docs = await MobileApp.find().select(
        'name releaseDate countryCode appIcon'
      ); //select fields

      if (docs.length > 0) {
        const mobileApps = docs.map(doc => {
          return {
            ...doc._doc
          };
        });
        res.render('home', {
          mobileApps: mobileApps,
          user: req.user
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  })();
});

router.get('/addMobileApp', isLoggedIn, (req, res) => {
  res.render('addMobileApp', { user: req.user });
});

//async sample
router.get('/editMobileApp/:id', isLoggedIn, async (req, res, next) => {
  try {
    const doc = await MobileApp.findById(req.params.id);

    if (doc) {
      res.render('editMobileApp', { ...doc._doc, user: req.user });
    } else {
      req.flash('warning', 'No data to display, you can add new app');
      res.redirect('/clientSide/addMobileApp');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/addMobileApp', (req, res) => {
  const mobileApp = new MobileApp({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    countryCode: req.body.countryCode,
    appIcon: req.body.appIcon
  });

  mobileApp
    .save()
    .then(result => {
      req.flash('success', 'Mobile App successfully added');
      res.redirect('/clientSide/home');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/editMobileApp/:id', (req, res) => {
  const mobileApp = new MobileApp({
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    countryCode: req.body.countryCode,
    appIcon: req.body.appIcon
  });

  MobileApp.updateOne({ _id: req.params.id }, mobileApp)
    .then(result => {
      req.flash('success', 'Mobile App successfully updated');
      res.redirect('/clientSide/home');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get('/delete/:id', isLoggedIn, (req, res) => {
  MobileApp.deleteOne({ _id: req.params.id })
    .then(result => {
      req.flash('success', 'Mobile App successfully deleted');
      res.redirect('/clientSide/home');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
