const {CustomAPIError} = require('../errors/custom-error')

// To create an error handler we just pass four parameters to a function the first will be error\

const errorHandlerMiddleware = (err, req, res, next) => { 
  // if the error is our custom error then we'll use response according to that
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({msg: err.message})  
  }
  
  return res.status(500).json({msg: err})  
}

module.exports = errorHandlerMiddleware
