const express = require("express");
const { getCourses, addCourse } = require("../controllers/courseController");
const router = express.Router();

router.get("/courses", getCourses);
router.post("/add-course", addCourse);

module.exports = router;
