const jwt = require('jsonwebtoken');

const config = require('../config/database');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_KEY); //decode and verify, we add header not req.bod
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

//router.post("/", checkAuth, mobileAppValidationRules(), validate, (req, res) => { checkAuth-> middleware func,
