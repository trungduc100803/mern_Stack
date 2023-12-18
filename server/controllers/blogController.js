const { blogModel, userModel } = require('../models/index')


const blogController = {
    //get all blog
    getAllBlog: async (req, res) => {
        try {
            const blogs = await blogModel.find()
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // get a blog 
    getABlog: async (req, res) => {
        try {
            const blog = await blogModel.findById(req.params.id)
            res.status(200).json(blog)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //add a blog
    addABlog: async (req, res) => {
        const newBlog = new blogModel(req.body)
        try {
            const savedBlog = await newBlog.save()

            const user = await userModel.findById(req.body._id)
            await user.updateOne({ $push: { blog: savedBlog._id } })
            res.status(200).json(savedBlog)
        } catch (error) {

        }
    },
    likeBlog: async (req, res) => {
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

            const blog = await blogModel.findById(id)
            const user = await userModel.findById(idUser)
            if (!blog) return res.status(401).send({
                success: false,
                message: "no find blog"
            })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })


            const numLike = blog.like
            blog.like = numLike + 1
            user.liked.blog.push(blog._id)
            await blog.save()
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
    cancelLikeBlog: async (req, res) => {
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

            const blog = await blogModel.findById(id)
            const user = await userModel.findById(idUser)
            if (!blog) return res.status(401).send({
                success: false,
                message: "no find blog"
            })
            if (!user) return res.status(401).send({
                success: false,
                message: "no find user"
            })


            const numLike = blog.like
            blog.like = numLike - 1
            var index = user.liked.blog.indexOf(id)
            if (index !== -1) {
                user.liked.blog.splice(index, 1);
            }
            await user.save()
            await blog.save()
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
    addCommentBlog: async (req, res) => {
        try {
            const { sender, blogID } = req.body
            if (!sender || !blogID) return res.status(401).send({
                success: false,
                messageL: 'invalid'
            })

            await blogModel.updateOne({ _id: blogID }, { $set: { ownComment: sender } })
            return res.status(200).send({
                success: true,
                messageL: 'success'
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                messageL: 'err',
                error
            })
        }
    }
}


module.exports = blogController