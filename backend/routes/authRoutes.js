const express = require("express");
const { login, googleLogin,setPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/set-password", setPassword);

module.exports = router;



