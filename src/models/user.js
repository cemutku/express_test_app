const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true, // this option optimizes indexes
    //email regex, we also did this on validation.js
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);

// const users = [
//   {
//     id: 1,
//     email: "aromayne0@sina.com.cn",
//     username: "aromayne0",
//     namesurname: "Allayne Romayne",
//     password: "9fLlJLSnXb4"
//   },
//   {
//     id: 2,
//     email: "dvedenyapin1@bluehost.com",
//     username: "dvedenyapin1",
//     namesurname: "Doti Vedenyapin",
//     password: "WJMK5VN"
//   },
//   {
//     id: 3,
//     email: "mlevesque2@edublogs.org",
//     username: "mlevesque2",
//     namesurname: "Marylinda Levesque",
//     password: "SdSVGE3"
//   },
//   {
//     id: 4,
//     email: "asloley3@tuttocitta.it",
//     username: "asloley3",
//     namesurname: "Alaster Sloley",
//     password: "iWqEOXiIudl"
//   },
//   {
//     id: 5,
//     email: "mmacmakin4@army.mil",
//     username: "mmacmakin4",
//     namesurname: "Manny MacMakin",
//     password: "U9tfHg"
//   }
// ];

// module.exports = users;
