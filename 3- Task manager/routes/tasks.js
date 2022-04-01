// We'll set routes in this file.
const express = require('express')
const router = express.Router()
const {getAllItems,createTask,getTask,updateTask,deleteTask} = require('../controllers/tasks')

// we create similar routes but we can chain up different types of methods on the same route to make it easier to develop and maintain.
router.route('/')
  .get(getAllItems)
  .post(createTask)

router.route('/:id')
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)


// app.get('/api/v1/tasks')   - get all the tasks
// app.post('/api/v1/tasks')   - create a new task
// app.get('/api/v1/tasks/:id')   - get  single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')   - delete task


module.exports = router