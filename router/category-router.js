const express=require('express')
const router=express.Router()
const categoryController=require('../controllers/category-controller')

router.route('/create').post(categoryController.create)

module.exports=router