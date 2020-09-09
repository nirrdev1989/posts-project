const router = require('express').Router()

const { authToken } = require('../middleweres/auth')
const storeImages = require('../middleweres/multer.images.storage')
const UserController = require('../controllers/users')



router.post('/register', storeImages, UserController.register)


router.post('/login/auth', UserController.login)


router.post('/refresh_token', UserController.refreshToken)


router.get('/user/profile', authToken, UserController.getUser)


router.post('/user/update_profile', authToken, storeImages, UserController.userUpDateProfile)


router.post('/logout', UserController.logout)



module.exports = router