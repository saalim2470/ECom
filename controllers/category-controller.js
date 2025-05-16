const categoryModel = require('../models/category-model')
const mongoose = require('mongoose')

const create = async (req, res, next) => {
    try {
        const userId = req.userId
        if (req.file || req.file != undefined || req.file != null) {
            req.body.image = req.file.path
        }

        const newcategory = await categoryModel.create({ ...req.body, createdBy: userId, updatedBy: userId })
        res.status(201).json({
            data: newcategory,
            success: true,
            msg: 'created successfully'
        })

    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
        const skip = (page - 1) * limit;

        const total = await categoryModel.countDocuments();
        const categoryData = await categoryModel.find().skip(skip).limit(limit)
        res.status(200).json({
            data: categoryData,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.params.id
        //check id is entered or not
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const error = {
                status: 400,
                title: 'Bad Request',
                message: "Invalid or missing category ID"
            }
            next(error)
        }
        const categoryData = await categoryModel.findById(id)
        res.status(200).json({ data: categoryData })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        //check id is entered or not
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const error = {
                status: 400,
                title: 'Bad Request',
                message: "Invalid or missing category ID"
            }
            next(error)
        }
        //delete category
        const deletedCategory = await categoryModel.findByIdAndDelete(id)
        //if deletedCategory variable is contain category then is deleted if not contain then not found
        if (!deletedCategory) {
            const error = {
                status: 404,
                title: 'Not Found',
                message: "Category not found"
            }
            next(error)
        }
        res.status(200).json({
            data: deletedCategory,
            success: true,
            msg: 'category deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { create, getAll, get, deleteCategory }