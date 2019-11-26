const express = require('express');
const router = express.Router();

function mobileAppRouter() {
  const checkAuth = require('../middleware/checkAuth');
  const {
    mobilieApps_get_all,
    mobileApps_create_mobileApp,
    mobileApps_get_single,
    mobileApps_update_put,
    mobileApps_delete,
    mobileApps_update_patch
  } = require('../controllers/mobileApps');

  const {
    mobileAppValidationRules,
    validate
  } = require('../middleware/validator');

  //Get all,
  //Post(Insert) item
  router
    .route('/')
    .get(mobilieApps_get_all)
    .post(
      checkAuth,
      mobileAppValidationRules(),
      validate,
      mobileApps_create_mobileApp
    );

  //Get single item
  //Update item
  //Delete item
  //Update partial - Just change the values which is send by client (patch)

  router.use(checkAuth); //or router.all()..
  router
    .route('/:id')
    .get(mobileApps_get_single)
    .put(mobileApps_update_put)
    .delete(mobileApps_delete)
    .patch(mobileApps_update_patch);

  return router;
}

module.exports = mobileAppRouter;
