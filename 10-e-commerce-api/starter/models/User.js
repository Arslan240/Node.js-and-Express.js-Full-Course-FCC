const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true, 'Please provide name'],
    minlength:3,
    maxlength:50,
  },
  email:{
    type:String,
    unique: true,
    required:[true, 'Please provide email'],
    validate:{ //use validator package
      validator: validator.isEmail,
      message: 'Please provide valid email.'
    }
  },
  password:{
    type:String,
    required:[true, 'Please provide password'],
    minlength:6,
  },
  role:{
    type:String,
    enum:['admin', 'user'],
    default:'user'
  }
})

// the problem with using user.save() is that if we don't conditionally hash password, it will hash our hashed password and keep on doing it and then we can't login with our original password. We check if the password is modified or not and then only hash it according.
UserSchema.pre('save', async function() {
  // console.log(this.modifiedPaths()) //it returns an array of properties which are being modified.
  if(this.isModified('password')){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};



module.exports = mongoose.model('User',UserSchema)