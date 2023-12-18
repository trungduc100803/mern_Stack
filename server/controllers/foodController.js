const { foodModel, userModel } = require('../models/index')


const foodController = {
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
    addAFood: async (req, res) => {
        const newFood = new foodModel(req.body)
        try {
            const savedFood = await newFood.save()
            res.status(200).json(savedFood)
        } catch (error) {

        }
    },
    likeFood: async (req, res) => {
        try {
            const { id, idUser } = req.body
            if (!id) return res.status(400).send({
                success: false,
                message: "no find id"
            })
            if (!idUser) return res.status(400).send({
                success: false,
                message: "no find id user"
            })

            const food = await foodModel.findById(id)
            const user = await userModel.findById(idUser)
            if (!food) return res.status(401).send({
                success: false,
                message: "no find food"
            })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })


            const numLike = food.like
            food.like = numLike + 1
            user.liked.food.push(food._id)
            await food.save()
            await user.save()
            return res.status(200).send({
                success: true,
                message: "like success",
                user
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    cancelLikeFood: async (req, res) => {
        try {
            const { id, idUser } = req.body
            if (!id) return res.status(400).send({
                success: false,
                message: "no find id"
            })
            if (!idUser) return res.status(400).send({
                success: false,
                message: "no find id user"
            })

            const food = await foodModel.findById(id)
            const user = await userModel.findById(idUser)
            if (!food) return res.status(401).send({
                success: false,
                message: "no find food"
            })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })


            const numLike = food.like
            food.like = numLike - 1
            var index = user.liked.food.indexOf(id)
            if (index !== -1) {
                user.liked.food.splice(index, 1);
            }
            await user.save()
            await food.save()
            return res.status(200).send({
                success: true,
                message: "like success",
                user
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    }
}



module.exports = foodController