const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide product name'],
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [1000, 'Description can not be more than 1000 characters'],
  },
  image: {
    type: String,
    default: '/uploads/example.jpg' //image stored on server as default
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['office', 'kitchen','bedroom'],
  },
  company: {
    type: String,
    required: [true, 'Please provide product company'],
    enum: {
      values: ['ikea', 'liddy', 'marcos'],
      message: '{VALUE} is not supported'
    },
  },
  colors: {
    type: [String],
    default: '#222',
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  inventory: {
    type: Number,
    required: true,
    default: 15
  },
  averageRating:{
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
},{
  imestamps: true,
  toJSON: { virtuals: true }, //using virtuals we turn on virtual properties as alternative or better of populate which can only be used on actual properties. If we want all reviews of a product we have to use virtuals.
  toObject: { virtuals: true }
})

// virtual
// 'reviews' passed to virtual first parameter should be the same name which you use in the controller.
ProductSchema.virtual('reviews', {
  ref: 'Review', //schema name
  localField: '_id', // localField and foreignField is like primary key and foreign key relationship in SQL. We are looking for something which is common in both schemas but it's not an explicit property.
  foreignField: 'product', // in review schema product property is product id.
  justOne: false
})

// we delete all the reviews of a product when a product itself is deleted.
ProductSchema.pre('remove', async function (next){
  // we use this.model() method to access a model which is other than current model and then put deleteMany function and pass it the current product's id.
  await this.model('Review').deleteMany({product: this._id})
  next()
})

module.exports = mongoose.model('Product', ProductSchema)