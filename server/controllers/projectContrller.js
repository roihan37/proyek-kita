const Project = require("../models/projectsModel")

module.exports = {
    createProject: async (req, res, next) => {
        try {

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

            const newProject = new Project({
                template,
                managementID,
                title,
                detail,
                startDate,
                completeDate,
                status,
                remark,
                userId: req.userLogin.id
            })

            await newProject.save()

            res.status(201).json({
                newProject
            })

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    getProjectByUser: async (req, res, next) => {
        try {
            let projects
            projects = await Project.find({ userId: req.userLogin.id })
            if (!projects) {
                projects = "Don't have Project"
            }

            res.status(200).json(projects)
        } catch (error) {

            res.status(500).json({ message: "Internal Server Error" })

        }
    },

    getProjectByOne: async (req, res, next) => {
        try {
            const { id } = req.params

            const project = await Project.findOne({ id })
            if (!project) {
                throw { name: "notFound" }
            }
            res.status(200).json(project)
        } catch (error) {
            if (error === "notFound") {
                res.status(404).json({ message: "Project not found" })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    },

    editProjectById : async (req, res, next) => {
        try{
            const { id } = req.params
            const projectUser = await Project.findOne({userId : req.userLogin.id})
            if(!projectUser){
                throw { name: "Forbidden"}
            }
            const project = await Project.findByIdAndUpdate(id, req.body)
            if(!project){
                throw { name: "notFound"}
            }
            res.status(200).json({ message: 'Project was updated successfully.' })
            
        }catch(error){
            if (error === "notFound") {
                res.status(404).json({ message: "Project not found" })
            }else if(error.name === "Forbidden"){
                res.status(403).json({message: "You are not allowed to edit this project"})
            }else{
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    },

    destroyProjectById : async (req, res, next) => {
        try{
            const {id} = req.params
            const projectUser = await Project.findOne({userId : req.userLogin.id})
            if(!projectUser){
                throw { name: "Forbidden"}
            }
            const project = await Product.findByIdAndDelete(id)
            if(!project){
                throw { name: "notFound"}
            }
            
            res.status(200).json({ message: 'Project was deleted successfully!' })
        }catch(error){
            if (error === "notFound") {
                res.status(404).json({ message: "Project not found" })
            }else if(error.name === "Forbidden"){
                res.status(403).json({message: "You are not allowed to delete this project"})
            }else{
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }
}