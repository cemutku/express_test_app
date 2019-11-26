const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const appUsersController = require('../controllers/appUsers');

//Get all AppUsers
router.get('/', checkAuth, appUsersController.appUsers_get_all);

//Get single AppUser
router.get('/:id', checkAuth, appUsersController.appUsers_get_single);

//User validation
const { userValidationRules, validate } = require('../middleware/validator');
//Insert  AppUser
router.post(
  '/',
  checkAuth,
  userValidationRules(),
  validate,
  appUsersController.appUsers_create_appUser
);

//Update AppUser
router.put(
  '/:id',
  checkAuth,
  userValidationRules(),
  validate,
  appUsersController.appUsers_update_appUser
);

//Delete AppUser
router.delete('/:id', checkAuth, appUsersController.appUsers_delete_appUser);

module.exports = router;
