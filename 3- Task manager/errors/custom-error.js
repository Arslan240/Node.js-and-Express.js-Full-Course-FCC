
// we create a new class  of error so that we can create errors easily and pass them down to next() middleware.

class CustomAPIError extends Error {
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode
  } 
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = {
  createCustomError,
  CustomAPIError
};
