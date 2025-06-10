const { decoded } = require("../helpers/jsonwebtoken")
const User = require("../models/userModel")

module.exports ={
     authentication : async (req,res,next) =>{
        try{
            let {access_token} = req.headers
            if(!access_token){
                throw { name : 'Unauthorized'}
            }
    
            const token =  decoded(access_token)
            const user = await User.findById(token.id)
            if(!user){
                throw { name : 'Unauthorized'}
            }
    
            req.userLogin = {
                id : user.id
            }
            next()
        }catch(error){
            if(error.name === "Unauthorized" || error.name === "JsonWebTokenError"){
                res.status(401).json({message : 'Invalid Token'})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }

}