const path = require('path')
const {StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadImageLocal = async (req,res)=> {

    // check if file exist 
    if(!req.files) throw new CustomError.BadRequestError('No file uploaded')

    const productImage = req.files.image;

    // check formate 
    if(!productImage.mimetype.startsWith('image')) throw new CustomError.BadRequestError('Please Provide image')

    // check size 
    let maxSize = 1024 * 1024; 
    if(productImage.size > maxSize) throw new CustomError.BadRequestError('image size must be less than ')

    const productPath = path.join(__dirname, `../public/uploads/${productImage.name}`)
    await productImage.mv(productPath)
    return res.status(StatusCodes.CREATED).json({
        image : {
            src : `/uploads/${productImage.name}`
        }
    })
    
}

const uploadImage = async (req, res) => {

const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: 'products'
})

// after the image uploaded on cloudinary delete it from temp folder
fs.unlinkSync(req.files.image.tempFilePath)
  res.status(StatusCodes.OK).json({
    image : {
        src: result.secure_url
    }
  })

}

module.exports = {
    uploadImage
}