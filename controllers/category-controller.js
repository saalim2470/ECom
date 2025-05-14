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

module.exports = { create }