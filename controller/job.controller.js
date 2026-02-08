const Job = require("../models/job.models")

//create job
exports.createJob = async(req,res)=>{
    try {
        const{title,companyName,location,salary,jobType,description,qualifications}=req.body;
        if(!title || !companyName || !location || !salary || !jobType || !description || !qualifications){
            return res.status(400).json({message:"All fields are required"})
        }
        const job = await Job.create({title,companyName,location,salary,jobType,description,qualifications})
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}

//get job by search
exports.getAllJob = async(req,res)=>{
    try {
        const {search} = req.query
        const query = search ? {title:{$regex:search,$options:"i"}} : {}
        const jobs = await Job.find(query).sort({createdAt:-1})
        res.json(jobs)
    } catch (error) {
        res.status(500).json({message:"Failed to fetch job",error:error.message})
    }
} 

//get job by id
exports.getJobById = async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({message:"Invalid job id",error:error.message})
    }
}

//delete job
exports.deleteJob = async(req,res)=>{
    try {
        const job = await Job.findByIdAndDelete(req.params.id)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        res.status(201).json({message:"Job deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Invalid job Id"})
    }
}