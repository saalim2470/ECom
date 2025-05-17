const express = require('express')
const router = express.Router()
var multer = require('multer')
const categoryController = require('../controllers/category-controller')
const validate_middleware = require('../middleware/validate-middleware')
const validation = require('../validators/categoryValidator')
const { multerStorage } = require('../functions/multerStorage')


const storage = multerStorage('categoryimages')
var upload = multer({ storage: storage })
//@route - /api/category/create
router.route('/create').post(upload.single('image'), validate_middleware(validation), categoryController.create)
//@route - /api/category/getAll
router.route('/getAll').get(categoryController.getAll)
//@route - /api/category/{id}
router.route('/:id').get(categoryController.get)
//@route - /api/category/{id}
router.route('/:id').delete(categoryController.deleteCategory)
//@route - /api/category/{id}
router.route('/:id').put(upload.single('image'),validate_middleware(validation), categoryController.update)

module.exports = router