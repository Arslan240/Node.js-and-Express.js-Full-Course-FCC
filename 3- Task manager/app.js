const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

// setting middleware, this middleware allows us to 
app.use(express.json())

app.get('/hello',(req,res) => {
  res.send('task manager app')
})


// to set up a route we use the use use funcion. We set the path and tell the function where the handler is located
// this single route can handle all of our requests which are coming to the api/v1/tasks and from there it is handled by routes/tasks file. So based onthe initial routes we can group the route requests in single file/route file
app.use('/api/v1/tasks',tasks)

// app.get('/api/v1/tasks')   - get all the tasks
// app.post('/api/v1/tasks')   - create a new task
// app.get('/api/v1/tasks/:id')   - get  single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')   - delete task


const port = 3000
app.listen(port, console.log('server is listeneing on port ' + port))