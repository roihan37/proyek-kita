const SubProject = require('../models/subProjectModel')

module.exports = {
    getAllSubByProjectId : async (req,res,next) => {
        try{
            const {projectId} = req.params
            const subProjects = await SubProject.find({projectId})
            res.status(200).json(subProjects)
        }catch(error){
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    getSubById : async (req,res,next) =>{
        try{
            const {id} = req.params
            const subProject = await SubProject.findOne({id})
            res.status(200).json(subProject)
        }catch(error){
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    addSubByProjectId : async (req,res,next) => {
        try{
            
            const {projectId} = req.params
            const {
                template,
                managementID,
                title,
                detail,
                startDate,
                completeDate,
                status,
                remark,
            } = req.body

            const newSubProject = new SubProject({
                template,
                managementID,
                title,
                detail,
                startDate,
                completeDate,
                status,
                remark,
                userId: req.userLogin.id,
                projectId 
            })

            await newSubProject.save()

            res.status(201).json({
                newSubProject
            })
        }catch(error){
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    editSubById : async (req,res,next) => {
        try{
            const { id } = req.params
            const subProjectUser = await SubProject.findOne({userId : req.userLogin.id})
            if(!subProjectUser){
                throw { name: "Forbidden"}
            }
            const subProject = await SubProject.findByIdAndUpdate(id, req.body)
            if(!subProject){
                throw { name: "notFound"}
            }
            res.status(200).json({ message: 'Sub Project was updated successfully.' })
            
        }catch(error){
            if (error === "notFound") {
                res.status(404).json({ message: "Sub Project not found" })
            }else if(error.name === "Forbidden"){
                res.status(403).json({message: "You are not allowed to edit this project"})
            }else{
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    },

    destroySubProjectById : async (req, res, next) => {
        try{
            const {id} = req.params
            const subProjectUser = await SubProject.findOne({userId : req.userLogin.id})
            if(!subProjectUser){
                throw { name: "Forbidden"}
            }
            const subProject = await SubProject.findByIdAndDelete(id)
            if(!subProject){
                throw { name: "notFound"}
            }
            
            res.status(200).json({ message: 'Sub Project was deleted successfully!' })
        }catch(error){
            if (error === "notFound") {
                res.status(404).json({ message: "Sub Project not found" })
            }else if(error.name === "Forbidden"){
                res.status(403).json({message: "You are not allowed to delete this Sub Project"})
            }else{
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

}