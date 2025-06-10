const express = require("express");
const { createUser, loginUser, forgotPassword, resetPassword } = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgotPswd", forgotPassword);
router.post("/resetPswd", resetPassword);


module.exports = router;