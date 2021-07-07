const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = 14;
const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// UserSchema.pre("save", function (next) {
//   var user = this;

//   if (user.isModified("password")) {
//     bcrypt.genSalt(salt, function (err, salt) {
//       if (err) return next(err);

//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

const Contacts = mongoose.model("contacts", ContactSchema);
module.exports = Contacts;
