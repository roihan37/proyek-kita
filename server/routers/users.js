const express = require("express");
const router = express.Router();
const { 
    createUser, 
    loginUser, 
    forgotPassword, 
    resetPassword 
} = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgotPswd", forgotPassword);
router.post("/resetPswd/:token", resetPassword);


module.exports = router;