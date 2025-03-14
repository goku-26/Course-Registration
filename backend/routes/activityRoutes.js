const express = require("express");
const router = express.Router();

const activities = [
  { timestamp: new Date(), description: "Course Updated: Web Development", user: "admin@bitsathy.ac.in", status: "Completed" },
  { timestamp: new Date(), description: "New Student Registration", user: "student1@bitsathy.ac.in", status: "Pending" },
];

router.get("/", (req, res) => {
  res.status(200).json(activities);
});

module.exports = router;
