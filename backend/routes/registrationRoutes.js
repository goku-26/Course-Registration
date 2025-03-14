// const express = require("express");
// const router = express.Router();
// const Course = require("../models/Course");  

// router.post("/", async (req, res) => {
//   const { department, courseName } = req.body;

//   if (!department || !courseName) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const newCourse = new Course({ department, courseName });
//     await newCourse.save();
//     res.status(201).json({ message: "Course registered successfully" });
//   } catch (error) {
//     console.error("Error saving course:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Registration = require("../models/Registration");
// const { validateRegistrationData } = require('../controllers/registrationController'); 
// const { registerCourse } = require("../controllers/registrationController");

// router.post("/register", registerCourse);
// // Registration endpoint
// router.post("/register", async (req, res) => {
//   const { studentEmail, rollNo, semester, department, course } = req.body;

//   if (!studentEmail || !rollNo || !semester || !department || !course) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if the course is already registered
//     const existingRegistration = await Registration.findOne({
//       studentEmail,
//       department,
//       course,
//     });

//     if (existingRegistration) {
//       return res.status(400).json({ message: "Course already registered" });
//     }

//     // Register the course
//     const newRegistration = new Registration({
//       studentEmail,
//       rollNo,
//       semester,
//       department,
//       course,
//     });
//     await newRegistration.save();

//     res.status(201).json({ message: "Course registered successfully", registration: newRegistration });
//   } catch (error) {
//     console.error("Error registering course:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Registration = require("../models/Registration");
// const { registerCourse, validateRegistrationData } = require("../controllers/registrationController");

// // Registration endpoint
// router.post("/register", async (req, res) => {
//   const { studentEmail, rollNo, semester, department, course } = req.body;

//   // Validate input fields
//   if (!studentEmail || !rollNo || !semester || !department || !course) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if the course is already registered by the same student
//     const existingRegistration = await Registration.findOne({
//       studentEmail,
//       department,
//       course,
//     });

//     if (existingRegistration) {
//       return res.status(400).json({ message: "Course already registered" });
//     }

//     // Register the course
//     const newRegistration = new Registration({
//       studentEmail,
//       rollNo,
//       semester,
//       department,
//       course,
//     });

//     await newRegistration.save();

//     res.status(201).json({
//       message: "Course registered successfully",
//       registration: newRegistration,
//     });
//   } catch (error) {
//     console.error("Error registering course:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update Course Status Endpoint
// router.put("/update-status/:id", async (req, res) => {
//   const { status } = req.body;

//   // Validate status input
//   if (!["Ongoing", "Complete"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status value" });
//   }

//   try {
//     const updatedRegistration = await Registration.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedRegistration) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json({
//       message: "Course status updated successfully",
//       registration: updatedRegistration,
//     });
//   } catch (error) {
//     console.error("Error updating course status:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Fetch All Registrations
// router.get("/courses", async (req, res) => {
//   try {
//     const registrations = await Registration.find();
//     res.status(200).json(registrations);
//   } catch (error) {
//     console.error("Error fetching registrations:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const { registerCourse, validateRegistrationData } = require("../controllers/registrationController");

// Course Registration Endpoint
router.post("/register", async (req, res) => {
  const { studentEmail, rollNo, semester, department, course } = req.body;

  if (!studentEmail || !rollNo || !semester || !department || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if course already registered
    const existingRegistration = await Registration.findOne({
      studentEmail,
      department,
      course,
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "Course already registered" });
    }

    const newRegistration = new Registration({
      studentEmail,
      rollNo,
      semester,
      department,
      course,
    });

    await newRegistration.save();
    res.status(201).json({
      message: "Course registered successfully",
      registration: newRegistration,
    });
  } catch (error) {
    console.error("Error registering course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Course Status Endpoint
router.put("/update-status/:id", async (req, res) => {
  const { status } = req.body;

  if (!["Ongoing", "Complete"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course status updated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Error updating course status:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch All Registered Courses Endpoint
router.get("/courses", async (req, res) => {
  try {
    const courses = await Registration.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
