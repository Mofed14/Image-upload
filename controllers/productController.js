const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createProduct = async (req, res)=> {
 
    const { productName, price, image} = req.body
    if(!productName || !price || !image) throw new CustomError.BadRequestError('Product Name and Price Must Be Provided');
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({
        product
    })
 }

const getAllProducts = async (req,res)=> {
   const products = await Product.find({})
   res.status(StatusCodes.OK).json({
    products
   })
}



module.exports = {
    createProduct,
    getAllProducts
}