const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', authController.register)

router.post('/login', authController.logIn)

router.post('/refresh', authController.requestRefreshToken)

router.post('/logOut', authController.logOut)


module.exports = router