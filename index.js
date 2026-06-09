const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

const {initiallizeDatabase} = require("./db/db.connect")

app.use(cors({
  origin:["http://localhost:5173","https://job-app-frontend-rh9j.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())

initiallizeDatabase()

//testing purpose
app.get("/",(req,res)=>{
    res.send("Server Connected Successfully")
})

//job routes
const jobRoutes = require("./routes/job.routes")
app.use("/jobs",jobRoutes)

//auth router
const authRoutes = require("./routes/auth.routes")
app.use("/auth",authRoutes)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})