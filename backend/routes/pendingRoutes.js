const express = require("express");
const Registration = require("../models/Registration");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pendingRequests = await Registration.find({ status: "Pending" });
    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending requests", error });
  }
});

module.exports = router;
