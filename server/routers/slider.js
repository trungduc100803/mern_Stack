const router = require('express').Router()
const sliderController = require('../controllers/sliderController')


router.get('/', sliderController.getAllSlider)

router.post('/createSlider', sliderController.addSlider)


module.exports = router