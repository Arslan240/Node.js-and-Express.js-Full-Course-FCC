const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['inteview','declined', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId, //this means that the type is a mongoose object type e.g in our case User model. We identify that using ref property.
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {timestamps:true})

module.exports = mongoose.model('Job', JobSchema)