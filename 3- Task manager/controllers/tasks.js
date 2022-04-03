const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error')
// As our controllers are using async functions so there is alot of try and catch. Which becomes redundant and hard tomaintain.
// So we'll create a middleware wrapper function for our controller functions.

// This controller will have functions implementing the logics.
const getAllItems = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find();
  res.status(200).json({ tasks: allTasks });
});

const createTask = asyncWrapper(async (req, res) => {
  // while using post method for sending data to server, in monogo db the .save method is asynchronous and it returns promise. So we can make our function async as well.
  //this will actually cause problem if we don't catch the error.

  const task = await Task.create(req.body);
  res.status(201).json({ task }); // 201 - successfull create error


  //idk but john is saying this is using some middleware. TO test that middleware we are using res.json()
  // because while creating task we need to send some confirmatino back that the task is created so for that purpose we just send back the body of req which we are passing some info from postman.
  // res.send(req.body)
  // res.send('create Task')
});

// in this controller we are dealing with getting a task based on the id that is passed in. So,
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  // when params are correct but there is no document matching that the findOne() will return null.
  if (task === null) {
    return next(createCustomError(`No task with id : ${taskID}`,404))
  }

  return res.status(200).json(task);


  // res.send(req.params) //works the same way as .json works
  // res.send('get Task')
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    // we need to send options then we'll get updated value back otherwise we get old value back. Also without options we'll not run validators defined in our schema
    new: true,
    runValidators: true,
  });

  if (task === null) {
    return next(createCustomError(`No task with id : ${taskID}`,404))
  }

  res.status(200).json({ msg: `this is id ${taskID}`, data: req.body });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (task === null) {
    return next(createCustomError(`No task with id : ${taskID}`,404))
  }

  return res.status(200).json({ del_task: task, success: true });


});

module.exports = {
  getAllItems,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
