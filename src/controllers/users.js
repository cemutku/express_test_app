const monggose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');
exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email }).then(doc => {
    if (doc.length > 0) {
      //it is not null when not exist
      res.status(409).json({
        message: 'Mail exists'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        //salt adding more chars to plain text password 10 is considered safe
        if (err) {
          res.status(500).json({
            error: err
          });
        } else {
          //bcrypt.hash is async because of this, we'll create user in callback func
          const user = new User({
            _id: new monggose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({ message: 'User created' });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
              // OR
              // next(err)
            });
        }
      });
    }
  });
};

exports.users_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(user => {
      //user is an array in find method
      if (user.length < 1) {
        //401 -> unauthorized,  do not return 404 to prevent brute-force attacks
        return res.status(401).json({
          message: 'Auth failed'
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }

        if (result) {
          //Login succeed, now we'll create jwt
          jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            config.JWT_KEY,
            {
              expiresIn: '1h'
            },
            (err, token) => {
              if (err) {
                return res.status(401).json({
                  message: 'Auth failed'
                });
              }
              //Create token async
              return res.status(200).json({
                message: 'Auth successfull',
                token: token
              });
            }
          );
        } else {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.users_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      res.json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
