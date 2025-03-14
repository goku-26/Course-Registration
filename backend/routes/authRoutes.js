// const express = require("express");
// const { login, googleLogin, setUserRole } = require("../controllers/authController");

// const router = express.Router();

// router.post("/login", login);
// router.post("/google-login", googleLogin);
// router.post("/set-role", setUserRole); 

// module.exports = router;

// const express = require("express");
// const { login, googleLogin, setPassword, setUserRole } = require("../controllers/authController");

// const router = express.Router();

// router.post("/login", login);
// router.post("/google-login", googleLogin);
// router.post("/set-password", setPassword);
// router.post("/set-role", setUserRole);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// **Course Registration Route**
router.post("/register", authController.registerCourse);

// **Login Routes**
router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);

// **User Actions**
router.post("/set-password", authController.setPassword);
router.post("/set-role", authController.setUserRole);

module.exports = router;
