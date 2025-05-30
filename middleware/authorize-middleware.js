const jwt = require('jsonwebtoken')

const authorizeMiddleware = (role) => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            const originalToken = token.split(' ')[1]
            jwt.verify(originalToken, process.env.JWT_SECERT_KEY, (err, decoded) => {
                if (err) {
                    const error = {
                        status: 401,
                        title: 'UnAuthorize',
                        message: 'Please login again to access'
                    }
                    next(error)
                } else {
                    if (role && decoded.role != role) {
                        const error = {
                            status: 401,
                            title: 'UnAuthorize',
                            message: 'Only admin can access'
                        }
                        next(error)
                    }
                    req.userId = decoded.userId
                    next()
                }
            });
        } else {
            const error = {
                status: 401,
                title: 'Please login to access',
                message: 'UnAuthorize request'
            }
            next(error)
        }

    } catch (error) {
        next(error)
    }
}

module.exports = authorizeMiddleware