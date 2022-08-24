const CustomError = require('../errors/')
const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')
const path = require('path')

const createProduct = async (req,res) => {
  // we add the creating user to the body which is product passed by admin, and then we pass the body to product.create
  const creatingUserId = req.user.userId
  req.body.user = creatingUserId
  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (req,res) => {
  const products = await Product.find({})
                    .populate('reviews')
  if(products.length === 0){
    throw new CustomError.NotFoundError('No products found')
  }

  res.status(StatusCodes.OK).json({products, count: products.length})
}

const getSingleProduct = async (req,res) => {
  const {id: productId} = req.params
  const product = await Product.findById(productId)
    .populate({
      path:'user',
      select: 'name'
    })
    .populate('reviews')
  if(!product){
    throw new CustomError.NotFoundError(`No product found`)
  }
  res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req,res) => {
  const {id:productId} = req.params
  const product = await Product.findOneAndUpdate({_id:productId}, req.body, {
    new:true, runValidators:true
  })

  if(!product){
    throw new CustomError.NotFoundError(`No product found`)
  }

  res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req,res) => {
  const {id:productId} = req.params
  const product = await Product.findOne({ _id:productId })
  
  if(!product){
    throw new CustomError.NotFoundError(`No product found`)
  }
  
  await product.remove()
  res.status(StatusCodes.OK).json({msg: 'Product removed successfully'})
}

const uploadImage = async (req,res) => {
  const files =  req.files
  if(!req.files){
    throw new CustomError.BadRequestError('No file uploaded')
  }
  const {image: productImage} = req.files
  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please upload image')
  }

  const maxSize = 1024 * 1024
  if(productImage.size > maxSize){
    throw new CustomError.BadRequestError('Please upload image smaller than 1MB')
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  console.log(imagePath);
  // mv is a function which is on file property provided by express package file upload, it allows us to move the file to a specified path. In this controller we first develope a path and then move the file to that path. 
  await productImage.mv(imagePath)
  res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`})

}

module.exports = {
  createProduct, 
  getAllProducts,
  getSingleProduct, 
  updateProduct, 
  deleteProduct, 
  uploadImage,
};

