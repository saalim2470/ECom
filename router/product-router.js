const express = require('express')
const router = express.Router()
const multer=require('multer')
const productController = require('../controllers/product-controller')
const authorizeMiddleware = require('../middleware/authorize-middleware')
const { multerStorage } = require('../functions/multerStorage')


const storage = multerStorage('productimages')
var upload = multer({ storage: storage })
//@route - /api/product/create
router.route('/create').post(authorizeMiddleware('Admin'),upload.array('images', 5), productController.create)
//@route - /api/product/getAll
router.route('/getAll').get(productController.getAll)

module.exports = router