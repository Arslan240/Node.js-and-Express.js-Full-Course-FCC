// This controller will have functions implementing the logics.

const getAllItems = (req,res) => {
  res.send('All items from the file')
}

const createTask = (req,res) => { 
  // because while creating task we need to send some confirmatino back that the task is created so for that purpose we just send back the body of req which we are passing some info from postman.
  res.json(req.body) //idk but john is saying this is using some middleware. TO test that middleware we are using res.json()
  // res.send(req.body)
  // res.send('create Task')
}

// in this controller we are dealing with getting a task based on the id that is passed in. So,
const getTask = (req,res) => { 
  res.json({id:req.params.id})
  // res.send(req.params) //works the same way as .json works
  // res.send('get Task')
}
const updateTask = (req,res) => { 
  res.send('update Task')
}
const deleteTask = (req,res) => { 
  res.send('delete Task')
}

module.exports = {
  getAllItems,
  createTask,
  getTask,
  updateTask,
  deleteTask
}