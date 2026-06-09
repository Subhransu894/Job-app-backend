const UserJob = require("../models/user.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
exports.registerUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(401).json({message:"Email and Password are required"})
        }
        const existingUser = await UserJob.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new UserJob({email , password: hashedPassword})
        await user.save()
        res.status(201).json({message:"Registration Successful"})
    } catch (error) {
        res.status(500).json({message:"Registration failed",error:error})   
    }
}
exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(401).json({message:"Email and Password are required"})
        }
        const user = await UserJob.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"},
        )
        res.json({token, email: user.email})
    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
}