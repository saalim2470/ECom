const validate = (schema) => async (req, res, next) => {
    try {
        const parse = await schema.parseAsync(req.body)
        req.body = parse
        next()
    } catch (error) {
        const status = 422//the server was unable to process the request because it contains invalid data
        const errorMsg = error.issues[0].message
        const err = {
            status: status,
            message: errorMsg
        }
        next(err)
        // res.status(400).json({ mesage: errorMsg })
    }
}

module.exports = validate