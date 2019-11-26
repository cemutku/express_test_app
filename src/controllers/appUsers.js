const mongoose = require('mongoose');

const AppUser = require('../models/appUser');
const MobileApp = require('../models/mobileApp');

exports.appUsers_get_all = (req, res, next) => {
  try {
    AppUser.find()
      .select('mobileApp, user _id')
      .populate('mobileApp', 'name') //get "name" from mobileApp if it is empty, all mobileApps fields will be included the response - reference documents in other collections.
      .then(docs => {
        res.json({
          count: docs.length,
          appUsers: docs.map(doc => {
            return {
              ...doc._doc,
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}/appUsers/${doc._id}`
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    next(error);
  }
};

exports.appUsers_get_single = (req, res, next) => {
  try {
    AppUser.findById(req.params.id)
      .populate('mobileApp')
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Item not found' });
        }

        res.json({
          appUser: result,
          request: {
            type: 'GET_ALL',
            url: `${req.protocol}://${req.get('host')}/appUsers`
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

    // let itemId = parseInt(req.params.id);
    // let isExist = appUsers.some(user => user.id === itemId);

    // if (isExist) {
    //   res.json({
    //     success: "true",
    //     users: appUsers.filter(user => user.id === itemId)
    //   });
    // } else {
    //   res.status(404).json({ success: "false", message: "No user found" });
    // }
  } catch (error) {
    next(error);
  }
};

exports.appUsers_create_appUser = (req, res, next) => {
  try {
    MobileApp.findById({ _id: req.body.mobileAppId })
      .then(product => {
        if (!product) {
          // return next(new Error("Mobile app not found"));
          // return new Promise((resolve, reject) => {
          //   reject(new Error("Mobile app not found"));
          // });
          //  return res.status(404).json();
          throw new Error('Mobile app not found');
        }

        const appUser = new AppUser({
          _id: mongoose.Types.ObjectId(),
          mobileApp: req.body.mobileAppId,
          user: req.body.userId
        });

        return appUser.save();
      })
      .then(result => {
        // console.log(result);
        res.status(201).json({
          succes: true,
          message: 'Item saved successfully',
          createdAppUser: {
            ...result._doc
          },
          request: {
            type: 'GET',
            url: `${req.protocol}://${req.get('host')}/mobileApps/${result._id}`
          }
        });
      })
      .catch(err => {
        // console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.appUsers_update_appUser = (req, res) => {
  try {
    AppUser.update(
      { _id: req.params.id },
      { $set: { mobileApp: req.body.mobileAppId, user: req.body.userId } }
    )
      .then(result => {
        console.log(result);
        res.status(200).json({
          success: 'true',
          message: 'Item updated',
          request: {
            type: 'GET',
            url: `${req.protocol}://${req.get('host')}/appUsers/${
              req.params.id
            }`
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    // if (isExist) {
    //   appUsers.forEach(currentUser => {
    //     if (currentUser.id === itemId) {
    //       currentUser.mobileAppId = req.body.mobileAppId
    //         ? req.body.mobileAppId
    //         : currentUser.mobileAppId;
    //       currentUser.userId = req.body.userId
    //         ? req.body.userId
    //         : currentUser.userId;
    //       res.status(200).json({
    //         success: "true",
    //         updatedUser: appUsers.filter(user => user.id === itemId)
    //       });
    //     }
    //   });
    // } else {
    //   res.status(404).json({ success: "false", message: "No user found" });
    // }
  } catch (error) {
    next(error);
  }
};

exports.appUsers_delete_appUser = (req, res, next) => {
  AppUser.deleteOne({ _id: req.params.id })
    .then(result => {
      res.json({
        message: 'Item deleted',
        request: {
          type: 'POST',
          url: `${req.protocol}://${req.get('host')}/appUser`, //You can post like this
          body: {
            mobileAppId: 'ID',
            userId: 'ID'
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
