const express = require("express");
const { createUserController } = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUserController);

module.exports = router;