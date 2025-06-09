const User = require("../models/userModel")


const createUserController = async (req, res, next) => {
    try {
        
        const {businessType, companyLocation, companyName, name, email, phoneNumber, password} = req.body

        const newUser = await User.createUser({businessType, companyLocation, companyName, name, email, phoneNumber, password})

        res.status(201).json({
            statusCode: 201,
            newUser
          });
    } catch (error) {
        
        res.status(500).json({message : 'Internal Server Error'})
    }
}

module.exports = {createUserController}