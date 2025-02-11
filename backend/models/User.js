const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null }, // ✅ Ensure password can be stored
  role: { type: String, default: "student" },
  googleId: { type: String, default: null },
});

module.exports = mongoose.model("User", UserSchema);



