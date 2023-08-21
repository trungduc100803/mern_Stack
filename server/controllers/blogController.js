const { blogModel, userModel } = require('../models/index')


const blogController ={
    //get all blog
    getAllBlog: async ( req, res ) => {
        try {
            const blogs = await blogModel.find()
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // get a blog 
    getABlog: async ( req, res ) => {
        try {
            const blog = await blogModel.findById( req.params.id )
            res.status(200).json(blog)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //add a blog
    addABlog: async (req, res)=>{
        const newBlog = new blogModel( req.body )
        try {
            const savedBlog = await newBlog.save()
            
            const user = await userModel.findById(req.body._id)
            await user.updateOne({ $push: { blog: savedBlog._id } })
            res.status(200).json(savedBlog)
        } catch (error) {
            
        }
    }
}


module.exports = blogController