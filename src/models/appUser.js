const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let appUserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mobileApp: {
    //add releation
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MobileApp',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('AppUser', appUserSchema);

// const appUsers = [
//   {
//     id: 1,
//     mobileAppId: 1,
//     userId: 1
//   },
//   {
//     id: 2,
//     mobileAppId: 2,
//     userId: 1
//   },
//   {
//     id: 3,
//     mobileAppId: 2,
//     userId: 1
//   }
// ];

// module.exports = appUsers;
