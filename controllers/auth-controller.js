const userModel = require('../models/user-model')
const bcrypt = require('bcryptjs')
const successMsg = { success: true, msg: "user created successfully" }
const errorMsg = { success: false, msg: "Internal error" }

const home = async (req, res) => {
    try {
        res.json({
            ...successMsg
        })
    } catch (error) {
        res.status(400).send({ msg: 'Not found' })
    }
}

const register = async (req, res,next) => {
    try {
        const {firstName,lastName,email, password, phoneNumber, role } = req.body
        // const exitUser = await userModel.findOne({ userName: reqData.userName })
        const exitUser = await userModel.findOne({ $or: [{ email }, { phoneNumber }] })//or filter
        if (exitUser) {
            return res.status(400).json({ msg: 'Email or phoneNumber already exits' })
        }
        const newUser = await userModel.create(req.body)
        res.status(201).json({
            data: {
                userId: newUser._id.toString(),
                email: newUser.email,
                role:newUser.role,
                token: await newUser.genrateToken(),
                createdAt:newUser.createdAt
            },
            ...successMsg
        })
    } catch (error) {
        next(error)
        // res.status(400).json({ msg: 'Not found' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const isUser = await userModel.findOne({ email })

        if (!isUser) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials"
            })
        }
        const comparepass = await bcrypt.compare(password, isUser.password)
        if (comparepass) {
            res.status(200).json({
                data: {
                    userId: isUser._id.toString(),
                    email: isUser.email,
                    role:isUser.role,
                    token: await isUser.genrateToken(),
                    createdAt:isUser.createdAt
                },
                success: true,
                msg: 'login success'
            })
        } else {
            return res.status(401).json({ msg: 'email or password not match' })
        }

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }
}

module.exports = {
    home,
    register,
    login
}