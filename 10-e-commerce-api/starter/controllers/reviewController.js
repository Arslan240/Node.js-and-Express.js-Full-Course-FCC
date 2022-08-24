const Review = require('../models/Review')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')



const createReview = async (req,res) => {
  const {product: productId} = req.body
  const {userId: creatingUserId} = req.user
  
  const isValidProduct = await Product.findOne({_id: productId})
  if(!isValidProduct){
    throw new CustomError.NotFoundError(`No product found with ${productId}`)
  }

  const alreadySubmitted = await Review.findOne({product: productId, user:creatingUserId})
  if(alreadySubmitted){
    throw new CustomError.BadRequestError('Already submitted review for this product.')
  }

  req.body.user = creatingUserId 
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({review})
}

const getAllReviews = async (req,res) => {
  // we can also query the mongoose object for their further details that we have currentyly stored in review as id. We can get back specific properties from our other models included in our current model. By using populate({path: modelName, select: properties})
  const reviews = await Review.find({})
    // .populate({
    //   path: 'product',
    //   select: 'name company price'
    // })
    // .populate({
    //   path: 'user',
    //   select: 'name'
    // })

  if(reviews.length === 0){
    throw new CustomError.NotFoundError('No reviews present at the moment')
  }

  res.status(StatusCodes.OK).json({reviews, count: reviews.length})
}


const getSingleReview = async (req,res) => {
  const {id: reviewId} = req.params

  const review = await Review.findOne({_id: reviewId})
  if(!review){
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }
  res.status(StatusCodes.OK).json({review})
}

const updateReview = async (req,res) => {
  const {id: reviewId} = req.params
  const {user: signedInUser} = req
  const {rating,title,comment} = req.body

  const review = await Review.findOne({_id : reviewId })
  if(!review){
    throw new CustomError.NotFoundError(`review does not exist with id : ${reviewId}`)
  }

  const {user: creatingUserId} = review
  checkPermissions(signedInUser,creatingUserId) //an admin can change it or the person itself can change it.

  review.rating = rating
  review.title = title
  review.comment = comment
  const updatedReview = await review.save({new: true, runValidators: true})
  
  res.status(StatusCodes.OK).json({updatedReview})
}

const deleteReview = async (req,res) => {
  const {id: reviewId} = req.params
  const {user: signedInUser} = req

  const review = await Review.findOne({_id : reviewId})
  if(!review){
    throw new CustomError.NotFoundError(`review does not exist with id : ${reviewId}`)
  }

  const {user: creatingUserId} = review
  
  checkPermissions(signedInUser, creatingUserId)
  await review.remove()
  res.status(StatusCodes.OK).json({msg: 'Review removed'})
}

//review of a single product
const getSingleProductReviews = async (req,res) => {
  const {id: productId} = req.params
  const reviews = await Review.find({product: productId}) 
  
  res.status(StatusCodes.OK).json({reviews, count: reviews.length})
}

module.exports = {
  createReview, 
  getAllReviews, 
  getSingleReview, 
  updateReview, 
  deleteReview,
  getSingleProductReviews
};
