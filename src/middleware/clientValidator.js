const { body, validationResult } = require('express-validator');

const registerValidationRules = () => {
  return [
    body('email', 'email is required')
      .not()
      .isEmpty(),
    body('password', 'password is required')
      .not()
      .isEmpty(),
    body('confirmPassword', 'password is required')
      .not()
      .isEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => req.flash('danger', err.msg));
  res.render('register', { user: req.user });
};

module.exports = {
  registerValidationRules,
  validate
};
