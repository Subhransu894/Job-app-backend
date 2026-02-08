const mongoose = require("mongoose")
require("dotenv").config()

const mongoURL = process.env.MONGODB

const initiallizeDatabase = async()=>{
    await mongoose.connect(mongoURL).then(()=>{
        console.log("Connected to DB Successfully")
    }).catch((err)=>{
        console.log("Error Connected to DB",err)
    })
}
module.exports = {initiallizeDatabase}