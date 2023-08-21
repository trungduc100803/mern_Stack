const { sliderModel } = require('../models/index')

const sliderController = {
    // GET ALL SLIDER
    getAllSlider: async (req, res) => {
        try {
            const sliders = await sliderModel.find()
            res.status(200).json(sliders)
        } catch (error) {
            res.status(500).json(error)
        }
    },


    //ADD SLIDER
    addSlider: async (req, res)=>  {
        try {
            const newSlider = new sliderModel( req.body )
            const savedSlider = await newSlider.save()

            res.status(200).json(savedSlider)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports =  sliderController 