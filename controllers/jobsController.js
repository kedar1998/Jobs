import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, NotFoundError} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'

const createJob = async (req,res) =>{
    const {position, company} = req.body

    if(!position || !company){
        throw new BadRequestError("Please provide all values")
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({
        job
    })
}

const deleteJob = async (req,res) =>{
    const {id} = req.params
    const job = await Job.findByIdAndDelete({_id: id})

    if(!job){
        throw new NotFoundError(`No job with id ${id}`)
    }

    checkPermissions(req.user, job.createdBy)

    res.status(StatusCodes.OK).json({
        msg: "Successfull deleted job!!!"
    })
}

const getAllJobs = async (req,res) =>{
    const job = await Job.find({createdBy: req.user.userId})

    res.status(StatusCodes.OK).json({
        totalJobs: job.length,
        numOfPages: 1,
        job,
    })
}

const updateJob = async (req,res) =>{
    const {id} = req.params

    const {company, position} = req.body

    if(!company || !position){
        throw new BadRequestError("Please provide all values")
    }
    
    const job = await Job.findOne({_id: id})
    
    if(!job){
        throw new NotFoundError(`No job with id ${id}`)
    }

    // check permissions
    checkPermissions(req.user, job.createdBy)

    const updatedJob = await Job.findOneAndUpdate({_id: id}, req.body, {
        new: true, 
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({
        updatedJob
    })

}

const showStats = async (req,res) =>{
    let stats = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: '$status', count: {$sum: 1}}},
    ])

    stats = stats.reduce((acc, curr) =>{
        const {_id: title, count} = curr
        acc[title] = count
        return acc
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }

    const monthlyApplications = []

    res.status(StatusCodes.OK).json({
        defaultStats, monthlyApplications
    })
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}