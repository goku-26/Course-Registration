// const express = require("express");
// const { login, googleLogin, setUserRole } = require("../controllers/authController");

// const router = express.Router();

// router.post("/login", login);
// router.post("/google-login", googleLogin);
// router.post("/set-role", setUserRole); 

// module.exports = router;

const express = require("express");
const { login, googleLogin, setPassword, setUserRole } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/set-password", setPassword);
router.post("/set-role", setUserRole);

module.exports = router;
