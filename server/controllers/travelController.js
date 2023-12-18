const { travelModel, userModel } = require('../models/index')


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
    },
    likeTravel: async (req, res) => {
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

            const travel = await travelModel.findById(id)
            const user = await userModel.findById(idUser)
            if (!travel) return res.status(401).send({
                success: false,
                message: "no find travel"
            })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })


            const numLike = travel.like
            travel.like = numLike + 1
            user.liked.travel.push(travel._id)
            await travel.save()
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
    cancelLikeTravel: async (req, res) => {
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

            const travel = await travelModel.findById(id)
            const user = await userModel.findById(idUser)
            if (!travel) return res.status(401).send({
                success: false,
                message: "no find travel"
            })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })


            const numLike = travel.like
            travel.like = numLike - 1
            var index = user.liked.travel.indexOf(id)
            if (index !== -1) {
                user.liked.travel.splice(index, 1);
            }
            await user.save()
            await travel.save()
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

module.exports = travelController