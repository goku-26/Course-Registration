// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   password: { type: String, default: null }, // ✅ Ensure password can be stored
//   role: { type: String, default: null },
//   googleId: { type: String, default: null },
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
  googleId: { type: String },
  role: { type: String }, // Role is assigned dynamically
});

module.exports = mongoose.model("User", UserSchema);


