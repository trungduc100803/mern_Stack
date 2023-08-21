const router = require('express').Router()
const travelController = require('../controllers/travelController')
const authMiddleware = require('../middleware/authMiddleware')

//get all travel
router.get('/' , travelController.getAllTravel)

//get a travel
router.get('/:id', travelController.getAtravel)

// add a travel
router.post('/', travelController.addATravel)


module.exports = router

