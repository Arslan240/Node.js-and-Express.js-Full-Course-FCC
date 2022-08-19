const path = require('path')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2

// we need this function because create Job method requires the path to the image. Now that image has to be uploaded to server first and then we can use that path of image to create a job. This function uploads image to the server.
const uploadProductImageLocal = async (req,res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }

  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
}

// for cloudinary
const uploadProductImage = async(req,res) => {
  const {tempFilePath} = req.files.image
  const result = await cloudinary.uploader.upload(
    tempFilePath, 
    {
    use_filename: true,
    folder: 'file-upload'
    }
  )

}

module.exports = {
  uploadProductImage
};
