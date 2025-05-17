const productModel = require('../models/product-model')

const create = async (req, res, next) => {
    try {
        const {
            name,
            description,
            categoryId,
            brand,
            price,
            discountPrice,
            unit,
            variants,
            images,
            tags,
            isAvailable,
            isFeatured,
            createdBy,
            updatedBy
        } = req.body
        const userId = req.userId

        const imagePath = req.files.map((file) => file.path)
        if (price) {
            req.body.price = parseInt(price)
        }
        if (discountPrice) {
            req.body.discountPrice = parseInt(discountPrice)
        }
        if (variants) {
            const varientsJson = variants.map((data) => JSON.parse(data))
            req.body.variants = varientsJson
        }
        req.body.images = imagePath
        const neweProduct = await productModel.create({ ...req.body, createdBy: userId, updatedBy: userId })
        res.status(201).json({
            data: neweProduct,
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

        const total = await productModel.countDocuments();
        const productsData = await productModel.find({}, 'name description price discountPrice').skip(skip).limit(limit)
        res.status(200).json({
            data: productsData,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, getAll }