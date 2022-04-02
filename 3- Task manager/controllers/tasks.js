const Task = require('../models/Task')

// This controller will have functions implementing the logics.
const getAllItems = async (req,res) => {
  try {
    const allTasks = await Task.find()
    res.status(200).json({tasks: allTasks})
  } catch (err) {
    res.status(500).json({msg: err})
  }
}


const createTask = async (req,res) => {  // while using post method for sending data to server, in monogo db the .save method is asynchronous and it returns promise. So we can make our function async as well.
  //this will actually cause problem if we don't catch the error.
  
  try {
    const task = await Task.create(req.body)
    res.status(201).json({task}) // 201 - successfull create error
  } catch (err) {
    res.status(500).json({msg:err}) // 500 - general server error
  } 
  
  //idk but john is saying this is using some middleware. TO test that middleware we are using res.json()
  // because while creating task we need to send some confirmatino back that the task is created so for that purpose we just send back the body of req which we are passing some info from postman.
  // res.send(req.body)
  // res.send('create Task')
}

// in this controller we are dealing with getting a task based on the id that is passed in. So,
const getTask = async (req,res) => { 
  try {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID})
    
    // when params are correct but there is no document matching that the findOne() will return null.
    if(task === null){
      return res.status(404).json({msg:`No task with id : ${taskID}`})
    }

    return res.status(200).json(task)

  } catch (err) {
    res.status(500).json({msg:err})
  }
  // res.send(req.params) //works the same way as .json works
  // res.send('get Task')
}
const updateTask = async (req,res) => { 
  try {
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({_id: taskID},req.body,{ // we need to send options then we'll get updated value back otherwise we get old value back. Also without options we'll not run validators defined in our schema
      new:true,
      runValidators:true
    }) 

    if(task === null){
      return res.status(404).json({msg:`No task with id : ${taskID}`})
    }

    res.status(200).json({msg: `this is id ${taskID}`, data: req.body})
  } catch (err) {
    res.status(500).json({msg:err})
  }
  
}
const deleteTask = async (req,res) => { 
  try {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})

    if(task === null){
      return res.status(404).json({msg: `No task found by id ${taskID}`})
    }

    return res.status(200).json({del_task: task, success: true})
  } catch (err) {
    res.status(500).json({err})
  }
}

module.exports = {
  getAllItems,
  createTask,
  getTask,
  updateTask,
  deleteTask
}