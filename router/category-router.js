const express = require('express')
const router = express.Router()
var multer = require('multer')
const categoryController = require('../controllers/category-controller')

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
router.route('/create').post(upload.single('image'), categoryController.create)
router.route('/getAll').get(categoryController.getAll)
router.route('/get/:id').get(categoryController.get)
router.route('/delete/:id').delete(categoryController.deleteCategory)

module.exports = router