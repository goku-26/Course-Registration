const Course = require('../models/Course');
const Registration = require('../models/Registration');

exports.registerCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Check if the user has already registered for the course
    const existingRegistration = await Registration.findOne({ courseId, userId });
    if (existingRegistration) {
      return res.status(400).json({ success: false, message: 'You have already registered for this course.' });
    }

    // Create a new registration entry
    const newRegistration = new Registration({ courseId, userId });
    await newRegistration.save();

    // Optionally, add more logic to update course data or perform other actions

    res.status(200).json({ success: true, message: 'Course registered successfully!' });
  } catch (error) {
    console.error('Error registering course:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
