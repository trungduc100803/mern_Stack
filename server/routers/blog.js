const router = require('express').Router()
const blogController = require('../controllers/blogController')


//get all blog
router.get('/', blogController.getAllBlog)

//get a blog
router.get('/:id', blogController.getABlog)

//add a blog
router.post('/', blogController.addABlog)

//like blog
router.post('/likeBlog', blogController.likeBlog)

//cancelLikeBlog
router.post('/cancelLikeBlog', blogController.cancelLikeBlog)

//addComment
router.post('/addComment', blogController.addCommentBlog)


module.exports = router

