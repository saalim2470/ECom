const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true })

const Category=new mongoose.model('Category',categorySchema)
module.exports=Category