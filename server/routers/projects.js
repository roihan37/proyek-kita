const express = require("express");
const { createProject, getProjectByUser, getProjectByOne, editProjectById, destroyProjectById } = require("../controllers/projectContrller");
const router = express.Router();

router.post("/", createProject )
router.get("/", getProjectByUser )
router.get("/:id", getProjectByOne)
router.put("/:id", editProjectById)
router.delete("/:id", destroyProjectById)


module.exports = router