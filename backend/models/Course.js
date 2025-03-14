// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   courseName: { type: String, required: true },
//   department: { type: String, required: true },
//   semester: { type: Number, required: true },
// });

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  // Add any other properties related to a course
});

module.exports = mongoose.model('Course', courseSchema);
