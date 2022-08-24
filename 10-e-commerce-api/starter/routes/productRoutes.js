const express = require('express')
const router = express.Router()
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')
const {
  createProduct, 
  getAllProducts,
  getSingleProduct, 
  updateProduct, 
  deleteProduct, 
  uploadImage,
} = require('../controllers/productController')
const {getSingleProductReviews} = require('../controllers/reviewController')

// according to rest we create get All products and create a product on the root route.

router.route('/')
  .get(getAllProducts) //accessible to all public
  .post([authenticateUser, authorizePermissions('admin')],createProduct) //only admin can do these so add middlewares

router.route('/uploadImage')
  .post([authenticateUser,authorizePermissions('admin')], uploadImage)

router.route('/:id')
  .get(getSingleProduct) //accessible to all 
  .patch([authenticateUser,authorizePermissions('admin')],updateProduct)
  .delete([authenticateUser,authorizePermissions('admin')],deleteProduct)

router.route('/:id/reviews')
  .get(getSingleProductReviews)

module.exports = router

