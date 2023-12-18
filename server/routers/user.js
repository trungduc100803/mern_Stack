const router = require('express').Router()
const { isAdmin } = require('../middleware/authMiddleware')
const userController = require('./../controllers/userController')

const formidableMiddleware = require('express-formidable')


router.post('/uploadCoverImg', userController.uploadCoverImg)
router.post('/like-post', userController.likePost)
router.post('/get-a-user', userController.getAUser)
router.post('/getAUserBuId', userController.getAUserByID)
router.post('/cancel-like-post', userController.cancelLikePost)
router.post('/create-travel', isAdmin, userController.createTravel)
router.put('/update-travel', isAdmin, userController.updateTravel)
router.delete('/delete-travel', isAdmin, userController.deleteTravel)

module.exports = router