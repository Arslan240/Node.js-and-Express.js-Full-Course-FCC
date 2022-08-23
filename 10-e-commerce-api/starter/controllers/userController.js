const { StatusCodes } = require('http-status-codes')
const CustomError  = require('../errors')
const User = require('../models/User');
const { createTokenUser, attatchCookiesToResponse, checkPermissions } = require('../utils');

const getAllUsers = async (req,res) => {
  console.log(req.user);
  const users = await User.find({role: 'user'}, '-password') //what we don't want we put '-' sign in front of it.
  if(!users.length){ //if length 0 it'll be true
    throw new CustomError.NotFoundError('No users Found')
  }

  res.status(StatusCodes.OK).json({users, length: users.length})
}

const getSingleUser = async (req,res) => {
  const {id} = req.params

  
  const user = await User.findById(id, '-password')
  
  if(!user) {
    throw new CustomError.NotFoundError('User does not exist')
  }
  checkPermissions(req.user,user._id)
  res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req,res) => {
  res.status(StatusCodes.OK).json({user: req.user})
}

const updateUser = async (req,res) => {
  const {name,email} = req.body
  const {userId} = req.user

  if(!name || !email){
    throw new CustomError.BadRequestError('Enter both values')
  }

  const user = await User.findOne({_id:userId}) 
  
  user.name = name
  user.email = email

  await user.save() //it invokes pre save hook in our Schema
  const tokenUser = createTokenUser(user)
  attatchCookiesToResponse({res,user:tokenUser})
  
  res.status(StatusCodes.OK).json({user:tokenUser})
}

const updateUserPassword =async (req,res) => {
  const {userId} = req.user
  const {oldPassword, newPassword} = req.body
  if(!oldPassword || !newPassword){
    throw new CustomError.NotFoundError('One of the passwords is missing')
  }
  
  const user = await User.findById(userId)

  const oldPassCorrect = await user.comparePassword(oldPassword)
  if(!oldPassCorrect){
    throw new CustomError.UnauthorizedError('Access is denied')
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({msg: 'Password updated successfully!'})
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
};











// const updateUser = async (req,res) => {
//   const {name,email} = req.body
//   const {userId} = req.user

//   if(!name || !email){
//     throw new CustomError.BadRequestError('Enter both values')
//   }

//   const user = await User.findOneAndUpdate({_id:userId}, {name,email},{new: true, runValidators: true}) //findOneAndUpdate() does not invoke pre save hook and will not hash the passwords or any other functions we need it to do
//   const tokenUser = createTokenUser(user)
//   attatchCookiesToResponse({res,user:tokenUser})
  
//   res.status(StatusCodes.OK).json({user:tokenUser})
// }