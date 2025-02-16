// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const User = require("../models/User");
// require("dotenv").config();

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Function to determine role based on email
// const assignRole = (email) => {
//   if (email.endsWith("@admin.com")) return "admin";
//   return "student";
// };

// // **Email & Password Login**
// exports.login = async (req, res) => {
//   try {
//     console.log("Login Request Received:", req.body);

//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.password) {
//       return res.status(400).json({ message: "User has no password set. Try Google Login." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     if (!user.role) {
//       user.role = assignRole(email);
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       token,
//       user,
//       message: "Login successful",
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// // **Google OAuth Login**
// exports.googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ message: "Google token required" });

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email, name, sub } = ticket.getPayload();
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({ email, name, googleId: sub });
//       await user.save();
//     }

//     if (!user.role) {
//       user.role = assignRole(email);
//       await user.save();
//     }

//     const jwtToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({ message: "Google login successful", token: jwtToken, user });
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ message: "Google login failed", error: error.message });
//   }
// };

// // **Set Role for a User**
// exports.setUserRole = async (req, res) => {
//   try {
//     const { email, role } = req.body;

//     if (!email || !role) {
//       return res.status(400).json({ message: "Email and role are required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.role = role;
//     await user.save();

//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "Role set successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error("Set Role Error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// **Assign Role Based on Email**
const assignRole = (email) => {
  const adminEmails = ["admin@example.com"]; // Add more admin emails if needed
  return adminEmails.includes(email) ? "admin" : "student";
};

// **Email & Password Login**
exports.login = async (req, res) => {
  try {
    console.log("Login Request Received:", req.body); // Debugging

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "User has no password set. Try Google Login." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Do not assign a role automatically
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// **Google OAuth Login**
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Google token required" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user without assigning a role
      user = new User({ email, name, googleId: sub });
      await user.save();
    }

    // Do not assign a role automatically
    const jwtToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Google login successful", token: jwtToken, user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed", error: error.message });
  }
};

// **Set Password for Google Users**
exports.setPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password) {
      return res.status(400).json({ message: "Password is already set. Try logging in." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "Password set successfully! You can now log in with email & password." });
  } catch (error) {
    console.error("Set Password Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// **Set User Role After First Login**
exports.setUserRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: "Email and role are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Role set successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Set Role Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};