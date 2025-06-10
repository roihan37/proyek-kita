const { compare, hash } = require("../helpers/bcryptjs")
const nodemailer = require("nodemailer");
const { createToken } = require("../helpers/jsonwebtoken")
const User = require("../models/userModel")

module.exports = {
     createUser : async (req, res, next) => {
        try {
            // body
            const {businessType, companyLocation, companyName, name, email, phoneNumber, password} = req.body
            // check email and phoneNumber
            const exitingEmail = await User.findOne({email})
            const exitingPhoneNumber = await User.findOne({phoneNumber})
            if(exitingEmail){
                return res.status(400).json({ errName:"email", message: "Sorry, Email already taken, Please use another email." });
            }
            if(exitingPhoneNumber){
                return res.status(400).json({ errName:"phoneNumber", message: "Sorry, Phone Number already taken, Please use another Phone Number." });
            }

            // create and save
            const newUser = new User({businessType, companyLocation, companyName, name, email, phoneNumber, password})
            await newUser.save();

            // direcly trun in dashboard
            const token = createToken({
                id : newUser.id
            })
            
            res.status(201).json({
                statusCode: 201,
                token
              });
        } catch (error) {
    
            console.log(error)
            if(error.name === "ValidationError"){
                res.status(400).json({error : error.message})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    },

    loginUser : async (req,res,next) =>{
        try{
            const { email, password} = req.body

            if(!email || !password){
                throw {name : "badRequest" }
            }

            const user = await User.findOne({email})
            if(!user){
                throw {name : "Unauthorized" }
            }
            
            const comparePassword = compare(password, user.password)
            if(!comparePassword){
                throw {name : "Unauthorized" }
            }
            const token = createToken({
                id : user.id
            })

            res.status(201).json({
                statusCode: 201,
                access_token : token
              });

        }catch(error){
            if(error.name === "badRequest"){
                res.status(400).json({message : "Email / Password is required"})
            }else if(error.name === "Unauthorized"){
                res.status(401).json({message : "Invalid Email / Password"})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    },

    forgotPassword : async (req,res,next) =>{
        try{
            const {email} = req.body
            // find Email
            const user = await User.findOne({email})
            if(!user){
                throw {name : "badRequest"}
            }

            const token = Math.random().toString(36).substr(2) + Date.now().toString(36)
            user.verifyPasswordToken = token
            user.verifyPasswordExpires = Date.now() + 3600000 
            await user.save()

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "pro.roihan@gmail.com",
                  pass: "aqnt vjyv kciq nxot",
                },
              });

              const mailOptions = {
                from: "mizudera3md@gmail.com",
                to: "pro.roihan@gmail.com",
                subject: "Iroro Verify Account Request",
                html:
                  `<a style="font-size:16px;color:#0043A1">Dear ` +
                  user.name +
                  `</a>\n\n` +
                  `<center style="font-size:16px">Forgot your password?<br> 
                  That’s okay, it happens!<br>
                  Please click the button bellow\n\n<br><br>` +
                  `<a class="btn" style="font-size:16px;text-decoration:none;background: #0043A1;color:white;border-radius:10px;padding-left:18px;padding-right:18px;padding-top:9px;padding-bottom:9px;" href="http://localhost:8080/api/auth/resetPswd/${token}"><b>RESET MY PASSWORD</b></a><br><br>` +
                  `If you didn’t request a password reset, don’t worry. You can safely ignore this e-mail.<br>
                  Please not that this link will expire within 24 hours.After 24 hours, you must submit a new password reset request.</center>\n`,
              };
              transporter.sendMail(mailOptions, (err) => {
                if (err) {
                  console.log(err, "<< nodemailer");
                  return res.status(500).send({ message: err });
                }
                return res.status(200).send({ message: "Email sent" });
              });

        }catch(error){
            if(error.name === "badRequest"){
                res.status(400).json({message : "Email / Password is required"})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    },

    resetPassword : async (req, res, next) => {
        try {
            const { token } = req.params
            const { newPassword } = req.body
            const user = await User.findOne({verifyPasswordToken: token})
            if(!user){
                throw {name : "UnauthorizedToken"}
            }
            if(user.verifyPasswordExpires < Date.now()){
                
            }
            if(!newPassword){
                throw {name : "badRequest"}
            }
            const hasNewPassword = hash(newPassword)
            user.password = hasNewPassword
            user.verifyPasswordToken = null
            user.verifyPasswordExpires = null
            await user.save()

            const tokenJwt = createToken({
                id : user.id
            })
            
            res.status(200).json({message : "Password successfully changed", access_token : tokenJwt})
        } catch (error) {
            if(error.name === "badRequest"){
                res.status(400).json({message : "Email / Password is required"})
            if(error.name === "UnauthorizedToken"){
                res
                .status(404)
                .json({ message: "Your reset password's token is invalid" })
            }
            if(error.name === "Forbidden"){
                res
                .status(403)
                .json({ message: "Your reset password's token is expired" })
            }
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }
}

