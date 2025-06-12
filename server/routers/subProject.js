const express = require("express");
const { getAllSubByProjectId, addSubByProjectId, editSubById, destroySubProjectById, getSubById } = require("../controllers/subProjectController");
const router = express.Router();

router.get('/:id', getSubById)
router.get('/:projectId', getAllSubByProjectId)
router.post('/:projectId', addSubByProjectId)
router.put('/:id', editSubById)
router.delete('/:id', destroySubProjectById)


module.exports = router