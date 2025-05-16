const express = require('express')
const router = express.Router()
var multer = require('multer')
const categoryController = require('../controllers/category-controller')
const validate_middleware = require('../middleware/validate-middleware')
const validation = require('../validators/categoryValidator')

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/categoryimages')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Unique filename
    }
})
var upload = multer({ storage: storage })
router.route('/create').post(upload.single('image'),validate_middleware(validation), categoryController.create)
router.route('/getAll').get(categoryController.getAll)
router.route('/:id').get(categoryController.get)
router.route('/:id').delete(categoryController.deleteCategory)
router.route('/:id').put(upload.single('image'), categoryController.update)

module.exports = router