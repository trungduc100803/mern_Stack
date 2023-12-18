const { commentModel } = require('../models/index')


const commentController = {
    getAllComment: async (req, res) => {
        try {
            const { idPost } = req.params
            if (!idPost) return res.status(401).send({
                success: false,
                message: "no find id post"
            })

            const comment = await commentModel.find({ sender: idPost })

            if (!comment) return res.status(200).send({
                success: true,
                message: "no comment",
                comment: []
            })

            return res.status(200).send({
                success: true,
                comment,
                message: "get all comment success"
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "error"
            })
        }
    },
    getAcomment: async (req, res) => {
        try {
            const { idPost } = req.params
            if (!idPost) return res.status(401).send({
                success: false,
                message: "no find id post"
            })

            const comment = await commentModel.findById(idPost)

            if (!comment) return res.status(401).send({
                success: false,
                message: "id invalid"
            })

            return res.status(200).send({
                success: true,
                comment,
                message: "get all comment success"
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "error"
            })
        }
    },
    addComment: async (req, res) => {
        try {
            const { sender, content, author } = req.body
            if (!sender) return res.status(402).send({
                success: false,
                message: 'no sender'
            })
            if (!content) return res.status(402).send({
                success: false,
                message: 'no content'
            })
            if (!author) return res.status(402).send({
                success: false,
                message: 'no author'
            })

            const finalComment = { sender, content, author }
            const newComment = commentModel(finalComment)
            const savedComment = await newComment.save()

            return res.status(200).send({
                success: true,
                message: 'success',
                savedComment
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: 'error'
            })
        }
    }
}

module.exports = commentController