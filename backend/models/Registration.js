// const mongoose = require("mongoose");

// const registrationSchema = new mongoose.Schema({
//   studentEmail: {
//     type: String,
//     required: true,
//     lowercase: true,
//   },
//   rollNo: {
//     type: String,
//     required: true,
//   },
//   semester: {
//     type: String,
//     required: true,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
//   course: {
//     type: String,
//     required: true,
//   },
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// module.exports = Registration;

const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  rollNo: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, enum: ["Ongoing", "Complete"], default: "Ongoing" },
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);

