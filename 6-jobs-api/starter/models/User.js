const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,'Please provide a name'],
    minlength:3,
    maxlength:50,
  },
  email:{
    type: String,
    required:[true,'Please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provde valid email'
    ],
    unique:true, //it creates a unique index, it creates a unique index
  },
  password:{
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  }
})

// this is a mongoose middleware function which is run before saving the document to the db. In this middleware we are hashing our password instead of hashing it in the controller.
UserSchema.pre('save', async function (next){ //function keyword allows us to use this to point to our document.
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
//jwt token
UserSchema.methods.createJWT = function () {
  return jwt.sign({
    userId: this._id,
    name: this.name
  },
  process.env.JWT_SECRET,
  {expiresIn: process.env.JWT_LIFETIME}
  )
}
// compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password) //this.password contains hashed password. The compare function hash the candidatePassword and then compare it to the actual hashed password stored in the database.
  return isMatch
}
module.exports = mongoose.model('User', UserSchema)

















// // we can create custom functions which can perform different functionalilties, and by using this we don't have to do every thing in the controller. Defininf functions in this way we must use function keyword and not the anonymous function because we want to use this keyword to refer to our current model.
// UserSchema.methods.getName  = function () {
//   return this.name
// }