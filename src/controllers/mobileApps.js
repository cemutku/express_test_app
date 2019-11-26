const monggose = require('mongoose');
const MobileApp = require('../models/mobileApp');

function mobileAppController() {
  function mobilieApps_get_all(req, res) {
    MobileApp.find()
      .select('name releaseDate countryCode appIcon') //select fields
      .then(docs => {
        if (docs.length > 0) {
          const response = {
            count: docs.length,
            mobileApps: docs.map(doc => {
              return {
                ...doc._doc,
                request: {
                  type: 'GET',
                  url: `${req.protocol}://${req.get('host')}/mobileApps/${
                    doc._id
                  }`
                }
              };
            })
          };
          res.json(response);
        } else {
          res.json({ message: 'No data found' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function mobileApps_get_single(req, res) {
    let itemId = req.params.id;
    MobileApp.findById(itemId)
      .select('name releaseDate countryCode appIcon') //select fields
      .then(doc => {
        if (!doc) {
          return res.status(404).json({ message: 'Item not found' });
        }

        res.json({
          mobileApp: doc,
          request: {
            type: 'GET',
            description: 'GET_ALL_MOBILE_APPS',
            url: `${req.protocol}://${req.get('host')}/mobileApps`
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  function mobileApps_create_mobileApp(req, res) {
    const mobileApp = new MobileApp({
      _id: new monggose.Types.ObjectId(),
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      countryCode: req.body.countryCode,
      appIcon: req.body.appIcon
    });

    mobileApp
      .save()
      .then(result => {
        console.log(result);
        res.status(200).send({
          success: 'true',
          message: 'Mobile app added successfully',
          createdMobileApp: {
            ...result._doc,
            request: {
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}/mobileApps/${
                result._id
              }`
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }

  function mobileApps_update_put(req, res) {
    const itemId = req.params.id;

    MobileApp.update(
      { _id: itemId },
      {
        $set: {
          name: req.body.name,
          releaseDate: req.body.releaseDate,
          countryCode: req.body.countryCode,
          appIcon: req.body.appIcon
        }
      }
    )
      .then(result => {
        res.status(200).json({
          success: 'true',
          message: 'Item updated',
          result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }

  function mobileApps_delete(req, res) {
    let itemId = req.params.id;
    MobileApp.deleteOne({ _id: itemId })
      .then(result => {
        res.status(200).json({
          success: 'true',
          message: `Item with Id: ${itemId} deleted`,
          result,
          request: {
            type: 'POST',
            url: `${req.protocol}://${req.get('host')}/mobileApps`, //You can post like this
            body: {
              name: 'String',
              releaseDate: 'Date',
              countryCode: 'String',
              appIcon: 'String'
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }

  function mobileApps_update_patch(req, res) {
    const itemId = req.params.id;
    const updateOps = {};

    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    //Sample request for for loop
    // [{ propName: "updateValue", value: "updateValue" }];
    // { $set: updateOps }

    MobileApp.update(
      { _id: itemId },
      // { $set: { name: req.body.name, releaseDate: req.body.releaseDate } }
      { $set: updateOps }
    )
      .then(result => {
        console.log(result);
        res.status(200).json({
          success: 'true',
          message: 'Item updated',
          request: {
            type: 'GET',
            url: `${req.protocol}://${req.get('host')}/mobileApps/${itemId}`
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  return {
    mobilieApps_get_all,
    mobileApps_get_single,
    mobileApps_create_mobileApp,
    mobileApps_update_put,
    mobileApps_delete,
    mobileApps_update_patch
  };
}

module.exports = mobileAppController;
