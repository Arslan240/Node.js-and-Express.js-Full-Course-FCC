const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs = async (req, res) => {
  const { userId } = req.user
  const jobs = await Job.find({createdBy: userId}).sort('createdAt')

  // if(!jobs){ //wont work cause jobs is an empty array
  //   throw new NotFoundError('No jobs found')
  // }

  res
    .status(StatusCodes.OK)
    .json({ jobs, count: jobs.length })
}

const getJob = async (req,res) => { 
  const {user: {userId}, params: {id: jobId}} = req //we also make sure that we get the only jobs which are for logged in user and not jobs of other users just because we have a job id.

  const job = await Job.findOne({
    _id: jobId,createdBy: userId
  })

  if(!job){
    throw new NotFoundError(`No job with id ${jobId}` )
  }

  res
    .status(StatusCodes.OK)
    .json(job)
}

const createJob = async (req,res) => { 
  req.body.createdBy = req.user.userId //because we need a createdAt property for our job, we access the user id in the user object in the request object and pass it to the create method of Job model
  const job = await Job.create(req.body)

  res
    .status(StatusCodes.CREATED)
    .json(job)
}

const updateJob = async (req,res) => { 
  const {
    body: {company,position},
    user: { userId },
    params: { id: jobId }
  } = req

  if(company === '' || position === ''){
    throw new BadRequestError('Company or position field cant be empty.')
  }

  const job = await Job.findByIdAndUpdate({
    _id: jobId, createdBy:userId
  }, req.body, {new: true, runValidators: true}) //new: true will return the job with new values, and runValidators will check new values according to the checks.

  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req,res) => { 
  const {
    user: { userId },
    params: { id: jobId }
  } = req

  const job = await Job.findOneAndRemove({
    _id: jobId, createdBy: userId
  })

  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send('Successfully deleted.')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};

