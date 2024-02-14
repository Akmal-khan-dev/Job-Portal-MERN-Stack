import jobModel from '../models/Job.js'
export const addJobController = async(req, res)=>{
    const {company, position} = req.body
    if(!company || ! position){
        next("Please provide all fields")
    }
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body)
    res.status(201).json({job})
}

export const allJobController = async(req, res, next) =>{
    const jobs = await jobModel.find({createdBy: req.user.userId})
    if(!jobs){
        next("No job found")
    }
    res.status(200).json({
        jobCount: jobs.length,
        jobs
    })
}

export const updateJobController = async (req, res)=>{
    const {id} = req.params;
    const {company, position} = req.body
    if(!company || !position ){
        next("All fields are required")
    }
    const job =await jobModel.findOne({_id:id} )
    if(!job){
        next("No job found")
    }

    if(!req.user.userId === job.createdBy.toString){
        next("Permission is denied")
    }

    const updateJob = await jobModel.findOneAndUpdate({_id:id}, req.body, {
        new:true,
        runValidators:true
    })
    res.status(200).json({
        message:"Job updated successfully",
        updateJob
    })
}

export const deleteJobController = async(req, res, next) =>{
    const {id} =req.params
    const job = await jobModel.findOne({_id: id})
    if(!job){
        next("No job found")
    }
    if(req.user.userId != job.createdBy.toString()){
        next("Internal Server error")
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job deleted successfully"
    })
}