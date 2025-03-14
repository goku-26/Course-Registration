// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");
// const registrationRoutes = require("./routes/registrationRoutes");


// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/registration", registrationRoutes);

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// app.use("/api/auth", authRoutes);
// app.use("/api/registration", registrationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/registration", registrationRoutes);

// In-memory storage for departments (or use MongoDB if preferred)
let departments = {
  CSE: ["Data Structures", "Algorithms", "Operating Systems"],
  "INFORMATION TECHNOLOGY": ["Web Development", "Cyber Security"],
  "COMPUTER TECHNOLOGY": ["Database Management", "Network Security"],
  AIML: ["Deep Learning", "Natural Language Processing"],
  AIDS: ["Big Data Analytics", "Data Mining"],
  EEE: ["Power Electronics", "Embedded Systems"],
  EIE: ["Industrial Automation", "Process Control"],
  ISE: ["Software Engineering", "Cloud Computing"],
  CIVIL: ["Structural Engineering", "Geotechnical Engineering"],
};

// Fetch departments and courses
app.get("/api/departments", (req, res) => {
  res.json(departments);
});

// Add a new course to a department
app.post("/api/departments/add-course", (req, res) => {
  const { department, course } = req.body;
  if (!department || !course) {
    return res.status(400).json({ message: "Department and course are required." });
  }
  if (!departments[department]) {
    return res.status(404).json({ message: "Department not found." });
  }
  if (departments[department].includes(course)) {
    return res.status(400).json({ message: "Course already exists in the department." });
  }
  departments[department].push(course);
  res.json({ message: "Course added successfully.", departments });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));