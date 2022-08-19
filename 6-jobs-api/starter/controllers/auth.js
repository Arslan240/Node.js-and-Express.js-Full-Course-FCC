const User = require('../models/User')
const {StatusCode, StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  
  const user = await User.create({...req.body})
  const token = user.createJWT()
 
  res
    .status(StatusCodes.CREATED)
    .send({
      user:{ name: user.name }, //we use the inbuild function to getName and then return the response.
      token
    })
} 

const login = async (req,res) => { 
  const {email, password} = req.body

  if(!email || !password){ //check if the credentials exist or not in the controller because it can be difficult to chase the error in the error handler.
    throw new BadRequestError('Please provide email and password')
  }
  console.log(email, password);
  // we check the email in the database OR if the user exists
  const user = await User.findOne({email}) //check against email.
  if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // we check if password matches
  const isPasswordCorrect = await user.comparePassword(password) //at this point we have reached the conclusion that user exists with the specific email. Now we want to check if the password is correct and that's why we setup instance method on UserSchema because we don't need to find the user again from the database. We can just access 'this' user by this keyword and compare pasword.
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }


  // if we make it to this line then the user exists and is logged in. So, we create a jwt token for that user and send back any information that we need at front end along with the jwt token 
  const token = user.createJWT() 
  res
    .status(StatusCodes.OK)
    .json({user: {name:user.name}, token})
}


module.exports = {
  register,
  login,
};
