const CustomError = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {

  if(requestUser.role === 'admin') return; //if admin then no problem he can access the route
  if(requestUser.userId === resourceUserId.toString()) return; //if the same user is accessing then also good
  
  //if we reach this line, then the user is not authorized to access
  throw new CustomError.UnauthorizedError('Not Authorized to access'); 
}

module.exports = checkPermissions