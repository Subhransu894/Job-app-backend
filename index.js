const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const allowedOrigin = [
    "http://localhost:5173",
    "https://job-app-backend-alpha.vercel.app"
]
const corOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

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

//auth router
const authRoutes = require("./routes/auth.routes")
app.use("/auth",authRoutes)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})