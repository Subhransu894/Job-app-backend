const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const corOptions = {
    origin:"*",
    credentials:true,
}

const {initiallizeDatabase} = require("./db/db.connect")

app.use(express.json())
app.use(cors(corOptions))

initiallizeDatabase()

//testing purpose
app.get("/",(req,res)=>{
    res.send("Server Connected Successfully")
})

//job routes
const jobRoutes = require("./routes/job.routes")
app.use("/jobs",jobRoutes)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})