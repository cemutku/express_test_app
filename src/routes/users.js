const express = require('express');
const router = express.Router();

const {
  user_signup,
  users_login,
  users_delete
} = require('../controllers/users');

const checkAuth = require('../middleware/checkAuth');

//Create New User
router.post('/signup', user_signup);

//Login User
router.post('/login', users_login);

//Delete User
router.delete('/:id', checkAuth, users_delete);

module.exports = router;
