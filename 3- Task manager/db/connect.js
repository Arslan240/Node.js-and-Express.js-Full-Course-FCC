// connecting to mongoose
const mongoose = require('mongoose')



// we are exporting the connection in function shapebecause we want to first connect to db only then we'll run the server. For that we'll export this function and call it in app.js
const connectDB = (url) => {
  return mongoose.connect(url,{
  //  this is for some deprecation warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}

module.exports = connectDB