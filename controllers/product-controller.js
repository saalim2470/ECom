const productModel = require('../models/product-model')
const mongoose = require('mongoose')

// Returns false if ID is invalid
const checkEnteredId = (id, next) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        const error = {
            status: 400,
            title: 'Bad Request',
            message: 'Invalid or missing ID',
        };
        next(error);
        return false;
    }
    return true;
};

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
        const productsData = await productModel.find({}, 'name description price discountPrice images').skip(skip).limit(limit)
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

const get = async (req, res, next) => {
    try {
        const productId = req.params.id
        //check productId is entered or not
        if (!checkEnteredId(productId, next)) return;
        const productData = await productModel.findById(productId)
        res.status(200).json({ data: productData, success: true })

    } catch (error) {
        next(error)
    }
}

const getProductByCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId

        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
        const skip = (page - 1) * limit

        //check categoryId is entered or not
        if (!checkEnteredId(categoryId, next)) return;
        const total = await productModel.countDocuments({ categoryId })

        const productData = await productModel.find({ categoryId }, 'name description price discountPrice images').skip(skip).limit(limit)
        res.status(200).json({
            data: productData,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            success: true,
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { create, getAll, get, getProductByCategory }