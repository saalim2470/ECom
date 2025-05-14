const express=require('express')
const router=express.Router()
const categoryController=require('../controllers/category-controller')

router.route('/create').post(categoryController.create)
router.route('/getAll').get(categoryController.getAll)
router.route('/get/:id').get(categoryController.get)

module.exports=router