const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const title = err.title || 'Error'
    const msg = err.message || 'Internal server error'
    return res.status(status).json({
        status, title, msg
    })
}

module.exports = errorMiddleware