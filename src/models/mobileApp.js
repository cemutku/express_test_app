const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mobileAppSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  releaseDate: Date,
  countryCode: String,
  appIcon: String
});

module.exports = mongoose.model('MobileApp', mobileAppSchema);

//For custom methods
//Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.

// const mobileApps = [
// {
//   id: 1,
//   name: "Mat Lam Tam",
//   releaseDate: "7/5/2019",
//   countryCode: "NL",
//   appIcon: "https://robohash.org/quiasitdelectus.bmp?size=50x50&set=set1"
// },
//   {
//     id: 2,
//     name: "Cardguard",
//     releaseDate: "4/7/2019",
//     countryCode: "VN",
//     appIcon: "https://robohash.org/nobisoptioad.bmp?size=50x50&set=set1"
//   },
//   {
//     id: 3,
//     name: "Fintone",
//     releaseDate: "10/23/2019",
//     countryCode: "GR",
//     appIcon: "https://robohash.org/beataeaeum.jpg?size=50x50&set=set1"
//   },
// {
//   id: 4,
//   name: "Bitchip",
//   releaseDate: "1/21/2019",
//   countryCode: "FR",
//   appIcon: "https://robohash.org/quidemearumnobis.png?size=50x50&set=set1"
// },
//   {
//     id: 5,
//     name: "Asoka",
//     releaseDate: "6/21/2019",
//     countryCode: "ID",
//     appIcon: "https://robohash.org/aerrorratione.bmp?size=50x50&set=set1"
//   },
//   {
//     id: 6,
//     name: "Zontrax",
//     releaseDate: "10/1/2019",
//     countryCode: "BR",
//     appIcon: "https://robohash.org/amaximesint.bmp?size=50x50&set=set1"
//   },
//   {
//     id: 7,
//     name: "Tampflex",
//     releaseDate: "1/7/2019",
//     countryCode: "ID",
//     appIcon:
//       "https://robohash.org/autvoluptatibuslaudantium.bmp?size=50x50&set=set1"
//   },
//   {
//     id: 8,
//     name: "Hatity",
//     releaseDate: "3/18/2019",
//     countryCode: "CN",
//     appIcon:
//       "https://robohash.org/inventorerepellatmodi.bmp?size=50x50&set=set1"
//   },
//   {
//     id: 9,
//     name: "Sub-Ex",
//     releaseDate: "1/19/2019",
//     countryCode: "SL",
//     appIcon: "https://robohash.org/cumvelitdolorem.bmp?size=50x50&set=set1"
//   },
//   {
//     id: 10,
//     name: "Wrapsafe",
//     releaseDate: "12/28/2018",
//     countryCode: "FR",
//     appIcon:
//       "https://robohash.org/atqueperspiciatisfacere.jpg?size=50x50&set=set1"
//   }
// ];

// module.exports = mobileApps;
