const router = require('express').Router()
const travelController = require('../controllers/travelController')
const authMiddleware = require('../middleware/authMiddleware')

//get all travel
router.get('/', travelController.getAllTravel)

//get a travel
router.get('/:id', travelController.getAtravel)

// add a travel
router.post('/', travelController.addATravel)

//like travel
router.post('/likeTravel', travelController.likeTravel)

//cancel like travel
router.post('/cancelLikeTravel', travelController.cancelLikeTravel)

module.exports = router

