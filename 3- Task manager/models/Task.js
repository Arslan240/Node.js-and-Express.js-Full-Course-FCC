// model is a representation of a collection.
// In mongoose model is a wrapper of schema
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"], //array needs the value and error message. It's like this in most ofthe mongo db schema
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false
  },
});

// we export model by using .model() func which accepts a name of the model and then a schema for it.
module.exports = mongoose.model("Task", TaskSchema);

// we can also add validation to our documents schema.
// by adding bunch of flags andproperties
