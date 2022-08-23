const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async (req,res,next) => { 
  const {token} = req.signedCookies 

  if(!token){ //means the user is not logged in.
    throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
  
  try {
    const {name, userId, role} = isTokenValid({token})
    req.user = {name, userId, role} //we set a new object role on req object, so that we also know that user is authenticated.
    next()
  } catch (err) {
    throw new CustomError.UnauthenticatedError('Authentication invalid.')
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {authenticateUser, authorizePermissions}





// const authorizePermissions = async (req,res,next) => {
//   const {role} = req.user 
//   if(role !== 'admin'){
//     throw new CustomError.UnauthorizedError('Unauthorized to access this route')
//   }
//   next()
// }