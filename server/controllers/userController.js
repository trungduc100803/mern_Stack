const { userModel, travelModel, foodModel, blogModel } = require('../models/index')
const fs = require('fs')


const userController = {
    getAUser: async (req, res) => {
        try {
            const { idAuth } = req.body

            if (!idAuth) return res.status(401).send({
                success: false,
                message: "no find auth"
            })

            const user = await userModel.find({ userID: idAuth })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })

            return res.status(200).send({
                success: true,
                message: "success",
                user
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "error",
                error
            })
        }
    },
    getAUserByID: async (req, res) => {
        try {
            const { userID } = req.body

            if (!userID) return res.status(401).send({
                success: false,
                message: "no find user"
            })

            const user = await userModel.findById(userID)
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })

            return res.status(200).send({
                success: true,
                message: "success",
                user
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "error",
                error
            })
        }
    },
    likePost: async (req, res) => {
        try {
            const { slug, postID, userID } = req.body

            if (!slug) {
                return res.status(400).send({
                    success: false,
                    message: "invalid slug"
                })
            }
            if (!postID) {
                return res.status(400).send({
                    success: false,
                    message: "invalid postID"
                })
            }
            if (!userID) {
                return res.status(400).send({
                    success: false,
                    message: "invalid userID"
                })
            }


            if (slug === "travel") {
                const travel = await travelModel.findOne({ _id: postID })
                const user = await userModel.findOne({ _id: userID })

                if (!travel) return res.status(404).send({
                    success: false,
                    message: "no find travel"
                })
                if (!user) return res.status(404).send({
                    success: false,
                    message: "no find user"
                })

                travel.like = travel.like + 1
                user.travelList.push(travel)

                await travel.save()
                await user.save()

                return res.status(200).send({
                    success: true,
                    user,
                    travel,
                    message: "Bạn đã like thành công "
                })
            } else if (slug === "food") {
                const food = await foodModel.findOne({ _id: postID })
                const user = await userModel.findOne({ _id: userID })

                if (!food) return res.status(404).send({
                    success: false,
                    message: "no find food"
                })
                if (!user) return res.status(404).send({
                    success: false,
                    message: "no find user"
                })

                food.like = food.like + 1
                user.foodList.push(food)

                await food.save()
                await user.save()

                return res.status(200).send({
                    success: true,
                    user,
                    food,
                    message: "Bạn đã like thành công "
                })
            } else {
                const blog = await blogModel.findOne({ _id: postID })
                const user = await userModel.findOne({ _id: userID })

                if (!blog) return res.status(404).send({
                    success: false,
                    message: "no find blog"
                })
                if (!user) return res.status(404).send({
                    success: false,
                    message: "no find user"
                })

                blog.like = blog.like + 1
                user.blogList.push(blog)

                await blog.save()
                await user.save()

                return res.status(200).send({
                    success: true,
                    user,
                    blog,
                    message: "Bạn đã like thành công "
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error,
                message: "error in likepost"
            })
        }
    },
    cancelLikePost: async (req, res) => {
        try {
            const { slug, postID, userID } = req.body

            if (!slug) {
                return res.status(400).send({
                    success: false,
                    message: "invalid slug"
                })
            }
            if (!postID) {
                return res.status(400).send({
                    success: false,
                    message: "invalid postID"
                })
            }
            if (!userID) {
                return res.status(400).send({
                    success: false,
                    message: "invalid userID"
                })
            }


            if (slug === "travel") {
                const travel = await travelModel.findOne({ _id: postID })
                const user = await userModel.findOne({ _id: userID })

                if (!travel) return res.status(404).send({
                    success: false,
                    message: "no find travel"
                })
                if (!user) return res.status(404).send({
                    success: false,
                    message: "no find user"
                })

                travel.like = travel.like - 1
                const travelDelete = user.travelList.filter(t => t._id !== postID)

                user.travelList.splice(travelDelete, 1)
                return res.status(200).send({
                    success: true,
                    user,
                    travelDelete,
                    message: "Bạn đã bỏ like thành công "
                })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "error in cancelLikePost"
            })
        }
    },
    createTravel: async (req, res) => {
        try {
            // slug
            // auth
            // user nguoi dang bai
            // schedule: {
            //     startDate: { type: String, require: true },
            //     startTime: { type: String, require: true },
            //     forcusHours: { type: String, require: true },
            //     time: { type: String, require: true },
            //     startAddress: { type: String, require: true },
            //     leftAttend: { type: Number, require: true },
            // },
            const { data, id } = req.body
            if (!data) return res.status(401).send({
                success: false,
                message: "is not data"
            })

            const newTravel = new travelModel(data)
            await newTravel.save()

            return res.status(200).send({
                success: true,
                newTravel,
                message: "create travel successfully"
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error,
                message: "error in create travel"
            })
        }
    },
    updateTravel: async (req, res) => {
        try {
            const { data, id, travelID } = req.body
            if (!data) return res.status(401).send({
                success: false,
                message: "is not data travel"
            })

            if (!travelID) return res.status(401).send({
                success: false,
                message: "is not travelID"
            })

            const _id = { _id: travelID }
            const travelUpdate = await travelModel.findOneAndUpdate(_id, data)
            const travelSaved = await travelUpdate.save()

            return res.status(200).send({
                success: true,
                message: "update travel successfully",
                travelSaved
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error,
                message: "error in update travel"
            })
        }
    },
    deleteTravel: async (req, res) => {
        try {
            const { id, travelID } = req.body

            if (!travelID) return res.status(401).send({
                success: false,
                message: "is not travelID"
            })

            await travelModel.deleteOne({ _id: travelID })
            return res.status(200).send({
                success: true,
                message: "delete travel successfully"
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "error in delete travel"
            })
        }
    },
    uploadCoverImg: async (req, res) => {
        try {
            const { coverImg, userID, avatar } = req.body
            if (!coverImg || !userID || !avatar) return res.status(401).send({
                success: false,
                message: "invalid cover or userid"
            })
            const newCoverImg = await userModel.updateOne({ userID }, { $set: { coverImg, avatar } })
            const user = await userModel.find({ userID })
            return res.status(200).send({
                success: true,
                message: "success",
                user
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "err"
            })
        }
    }


}


module.exports = userController