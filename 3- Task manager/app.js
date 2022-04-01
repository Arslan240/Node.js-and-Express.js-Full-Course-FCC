const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

// setting middleware, this middleware allows us to 
app.use(express.json())

app.get('/hello',(req,res) => {
  res.send('task manager app')
})


// to set up a route we use the use use funcion. We set the path and tell the function where the handler is located
app.use('/api/v1/tasks',tasks)


const port = 3000
app.listen(port, console.log('server is listeneing on port ' + port))