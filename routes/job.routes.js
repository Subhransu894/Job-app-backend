const express = require("express")
const router = express.Router();
const{createJob,getAllJob,deleteJob, getJobById} = require("../controller/job.controller")

//create a job
router.post("/",createJob)

//get all job
router.get("/",getAllJob)

//get job by id
router.get("/:id",getJobById)

//delete job
router.delete("/:id",deleteJob)

module.exports = router;