const router = require('express').Router()

const PostController = require('../controllers/posts')

const { authToken } = require('../middleweres/auth')
const storeImages = require('../middleweres/multer.images.storage')


router.get('', PostController.getPosts)


router.post('/new', authToken, storeImages, PostController.addPost)


router.post('/add/comment/:id', authToken, PostController.addCommentToPost)


router.delete('/del/:id', authToken, PostController.deletePost)


router.delete('/del/comment/:id/:commentId', authToken, PostController.deleteCommentFromPost)


router.put('/update/:id', authToken, storeImages, PostController.updatePost)


router.get('/single_post/:id', PostController.getSinglePost)



module.exports = router

