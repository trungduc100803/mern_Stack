const { foodModel, userModel } = require('../models/index')


const foodController =  {
    //get all food
    getAllFood: async (req, res) => {
        try {
            const foods = await foodModel.find()
            res.status(200).json(foods)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //get a food 
    getAFood: async (req, res) => {
        try {
            const food = await foodModel.findById(req.params.id)
            res.status(200).json(food)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //add a food 
    addAFood: async (req, res)=>{
        const newFood = new foodModel( req.body )
        try {
            const savedFood = await newFood.save()
            res.status(200).json(savedFood) 
        } catch (error) {
            
        }
    }
}



module.exports = foodController