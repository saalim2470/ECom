const categoryModel = require('../models/category-model')

const create = async (req, res, next) => {
    try {
        const userId = req.userId
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
        const categoryData = await categoryModel.find()
        res.status(200).json({ data: categoryData })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.params.id.toString()
        const categoryData = await categoryModel.findById(id)
        res.status(200).json({ data: categoryData })
    } catch (error) {
        next(error)
    }
}
module.exports = { create, getAll, get }