const { travelModel } = require('../models/index')


const travelController = {
    //get All Travel
    getAllTravel: async (req, res) => {
        try {
            const travels = await travelModel.find()
            res.status(200).json(travels)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // get a travel
    getAtravel: async (req, res) => {
        try {
            const travel = await travelModel.findById(req.params.id)
            res.status(200).json(travel)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // add a travel 
    addATravel: async (req, res) => {
        const newTravel = new travelModel(req.body)
        console.log(newTravel)
        try {
            const savedTravel = await newTravel.save()
            res.status(200).json(savedTravel)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = travelController