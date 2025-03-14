const Registration = require("../models/Registration");

const registerCourse = async (req, res) => {
  const { studentEmail, rollNo, semester, department, course } = req.body;

  if (!studentEmail || !rollNo || !semester || !department || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the student has already registered for the same course
    const existingRegistration = await Registration.findOne({
      studentEmail,
      department,
      course,
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "Course already registered" });
    }

    // Create and save new registration record
    const newRegistration = new Registration({
      studentEmail,
      rollNo,
      semester,
      department,
      course,
    });

    await newRegistration.save();

    // Return success message with the new registration data
    res.status(201).json({
      message: "Course registered successfully",
      registration: newRegistration,
    });
  } catch (error) {
    console.error("Error registering course:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { registerCourse };
