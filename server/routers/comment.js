const router = require('express').Router()
const commentController = require('../controllers/commentController')

router.get('/getAllComment/:idPost', commentController.getAllComment)
router.post('/addComment', commentController.addComment)

module.exports = router