const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer'],
        default: 'Customer'
    }
}, { timestamps: true })

//convert password to hash password with schema pre-method 
userSchema.pre('save', async function (next) {
    const schema = this
    if (!schema.isModified("password")) {
        next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(schema.password, salt)
        schema.password = hashPassword
    } catch (error) {
        next(error)
    }
})

// instance method
userSchema.methods.genrateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            role:this.role
        }, process.env.JWT_SECERT_KEY, {
            expiresIn: '1h'
        })
    } catch (error) {
        console.error(error)
    }
}

const User = new mongoose.model('User', userSchema)
module.exports = User

