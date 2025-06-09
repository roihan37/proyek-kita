const User = require("../models/userModel")


const createUserController = async (req, res, next) => {
    try {
        
        const {businessType, companyLocation, companyName, name, email, phoneNumber, password} = req.body

        const newUser = new User({businessType, companyLocation, companyName, name, email, phoneNumber, password})

        await newUser.save();
        res.status(201).json({
            statusCode: 201,
            newUser
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

module.exports = {createUserController}