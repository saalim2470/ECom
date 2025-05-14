const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')
const validation = require('../validators/signupValidator')
const validate_middleware = require('../middleware/validate-middleware')

// router.get('/', (req, res) => {
//     res.send('Hello now you are login')      //1st method
// })

// router.route('/').get((req, res) => {           //2nd method
//     res.send('Hello now you are login')
// })

// controller method
router.route('/').get(authController.home)

router.route('/register').post(validate_middleware(validation), authController.register)
router.route('/login').post(authController.login)

module.exports = router