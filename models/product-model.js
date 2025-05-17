const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema({
    unit: {
        type: String,
        required: true
    }, // e.g., '500gm'
    price: {
        type: Number,
        required: true
    },
    discountPrice: Number,
    isAvailable: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brand: String,
    price: Number,
    discountPrice: Number,
    unit: String,    // e.g., '500gm'
    variants: {
        type: [variantSchema],
        default: undefined //  optional bana diya
    },
    images: [
        String
    ],
    tags: [
        String
    ],
    isAvailable: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
