require('dotenv').config()
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// setting middleware, this middleware allows us to 
app.use(express.static('./public'))
app.use(express.json())




// ROUTES
// to set up a route we use the use use funcion. We set the path and tell the function where the handler is located
// this single route can handle all of our requests which are coming to the api/v1/tasks and from there it is handled by routes/tasks file. So based onthe initial routes we can group the route requests in single file/route file
app.use('/api/v1/tasks',tasks)
app.use(notFound) //the paths which doesn't patch
app.use(errorHandlerMiddleware)

// this is to 
const port = process.env.PORT || 3000
// const port = 3000

// this func will evoke connectDB function and because it returns a promise we can create start as async func
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) //if connection establishes then we run the server in the next line
    app.listen(port, console.log('server is listeneing on port ' + port))
  } catch (err) {
    console.log(err);
  }
}

start()