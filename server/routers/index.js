const express = require("express");
const router = express.Router();
const userRouter = require('./users')
const projectRouter = require('./projects');
const { authentication } = require("../middleware/aunth");

router.use("/users", userRouter)
router.use(authentication)
router.use("/projects", projectRouter)
// router.use("/subProjects", projectRouter)

module.exports = router;