const router = require('express').Router()
const blogController = require('../controllers/blogController')


//get all blog
router.get('/', blogController.getAllBlog)

//get a blog
router.get('/:id', blogController.getABlog)

//add a blog
router.post('/', blogController.addABlog)


module.exports = router

