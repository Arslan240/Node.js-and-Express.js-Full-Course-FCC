require('dotenv').config()
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const User = require('../models/User')
const {attatchCookiesToResponse, createTokenUser} = require('../utils')

const register = async (req,res) => {
  const {name, email, password} = req.body
  const userExists = await User.findOne({email})

  if(userExists){
    console.log(userExists);
    throw new CustomError.BadRequestError('email already exists')
  }

  // first registered user is admin
  const isFirstAccount = await User.countDocuments({}) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  
  const user = await User.create({name,email,password, role}) //or we can just directly change a user's settings to admin from the mongo db  
  const tokenUser = createTokenUser(user)

  attatchCookiesToResponse({res, user:tokenUser})
  res.status(StatusCodes.CREATED).json({user: tokenUser})

}

const login = async (req,res) => {
  const {email, password} = req.body
  if(!email) {
    throw new CustomError.BadRequestError('Please provide email')
  }
  if(!password){
    throw new CustomError.BadRequestError('Please provide password')
  }

  const user = await User.findOne({email}) // find One returns a single document. A simple find returns an array. and in case no one found then it'll be empty array and is not being treated as falsy value in if condition idk why.
  if(!user){
    throw new CustomError.UnauthenticatedError('Invalid email')
  }
  
  // remember to use instance instead of model name, cz i wasted a lot of time on it.
  const passwordVerified = await user.comparePassword(password)
  if(!passwordVerified){
    throw new CustomError.UnauthenticatedError('Invalid Password')
  }

  const tokenUser = createTokenUser(user)
  attatchCookiesToResponse({res, user: tokenUser})
  res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const logout = (req,res) => {
  //here we are just overwriting the previous value of token cookie and changing some attributes of it. the expires: of right now means it will expire when logout is clicked.
  res.cookie('token', 'logout',{
    httpOnly: true,
    expires: new Date( Date.now())
  })
  res.status(StatusCodes.OK).json({msg: 'logout cogntroller'})
}

module.exports = {  
  register,
  login,
  logout,
};
