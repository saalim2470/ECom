const { json } = require('express');
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

module.exports = { create }