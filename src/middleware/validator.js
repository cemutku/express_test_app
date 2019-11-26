const { body, validationResult } = require('express-validator');

const mobileAppValidationRules = () => {
  return [
    body('name', 'name is required')
      .not()
      .isEmpty(),
    body('releaseDate', 'releaseDate is required')
      .not()
      .isEmpty(),
    body('countryCode', 'countryCode is required')
      .not()
      .isEmpty(),
    body('appIcon', 'appIcon is required')
      .not()
      .isEmpty()
  ];
};

const userValidationRules = () => {
  return [
    body('mobileAppId', 'mobileAppId is required')
      .not()
      .isEmpty(),
    body('userId', 'userId is required')
      .not()
      .isEmpty()
  ];
};

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
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  mobileAppValidationRules,
  userValidationRules,
  registerValidationRules,
  validate
};
