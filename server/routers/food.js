const router = require('express').Router()
const foodController = require('../controllers/foodController')

// get all food
router.get('/', foodController.getAllFood)

//get a food
router.get('/:id', foodController.getAFood)

// add a food
router.post('/', foodController.addAFood)

//like food
router.post('/likeFood', foodController.likeFood)
//cancelLikeFood
router.post('/cancelLikeFood', foodController.cancelLikeFood)


module.exports = router