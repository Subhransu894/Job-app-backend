const express = require("express")
const router = express.Router();
const{createJob,getAllJob,deleteJob, getJobById} = require("../controller/job.controller")
const {authMiddleware} = require("../middleware/auth.middleware")
//create a job
router.post("/",authMiddleware,createJob)

//get all job
router.get("/",getAllJob)

//get job by id
router.get("/:id",getJobById)

//delete job
router.delete("/:id",authMiddleware,deleteJob)

module.exports = router;