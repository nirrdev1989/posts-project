const jsonWebToken = require('jsonwebtoken')
const userService = require('../services/user.db')
const postsService = require('../services/posts.db')

const { UserModel } = require('../sceama-models/userschema')
const { createErrorMessage } = require('../middleweres/handle.api.error')
const {
    hashPassword,
    comparePassword,
    createToken,
    createUserPayLoad,
    createRefreshToken
} = require('../services/user')
const { createImagePath } = require('../services/image.path')
const { v4 } = require('uuid')
const config = require('../config/config')




exports.register = async (request, response, next) => {
    const { email, password, userName, genus, birthday } = request.body

    let imagePath = createImagePath(request)

    try {
        const hashedPassword = await hashPassword(password)

        const newUser = new UserModel({
            email: email,
            password: hashedPassword,
            profile: {
                userName: userName,
                genus: genus,
                birthday: birthday,
                imagePath: imagePath
            }
        })

        const user = await userService.saveUser(newUser)

        response.status(200).send({
            message: 'OK USER REGISTER'
        })

    } catch (error) {
        next(
            createErrorMessage(
                'USER EXSIT',
                500,
                request.url
            )
        )
    }

}



exports.login = async (request, response, next) => {
    const { email, password } = request.body

    try {
        const foundUser = await userService.findUserByEmail(email)

        if (!foundUser) {
            next(
                createErrorMessage(
                    'AUTH FAIL',
                    404,
                    request.url
                )
            )
        }

        const isMatch = await comparePassword(password, foundUser.password)

        if (!isMatch) {
            next(
                createErrorMessage(
                    'AUTH FAIL',
                    404,
                    request.url
                )
            )
        }


        const refreshToken = createRefreshToken({ userId: foundUser._id })
        foundUser.refreshToken = refreshToken
        await userService.saveUser(foundUser)


        const payload = createUserPayLoad(foundUser)
        const token = createToken(payload)


        response.status(200).send({
            message: 'OK USER LOGIN',
            token: token,
            refresh_token_expiresIn: config.REFRESH_TOKEN.seconds,
            refreshToken: refreshToken,
            userId: foundUser._id,
            userInfo: {
                email: foundUser.email,
                imagePath: foundUser.profile.imagePath,
            }
        })
    } catch (error) {
        next(error)
    }

}


exports.getUser = async function (request, response, next) {
    const { userId } = request.userData

    try {
        const userFound = await userService.findUserById(userId)

        if (!userFound) {
            next(
                createErrorMessage(
                    'NOT FOUND',
                    404,
                    request.url
                )
            )
        }

        response.status(200).send({
            message: 'OK GET USER',
            user: userFound
        })

    } catch (error) {
        next(
            createErrorMessage(
                'AUTH FAIL',
                500,
                request.url
            )
        )
    }
}


exports.refreshToken = async function (request, response, next) {
    const { refreshToken, userId } = request.body

    try {
        const foundUser = await userService.findUserById(userId)
        console.log('FOUND USER')

        if (!foundUser) {
            next(
                createErrorMessage(
                    'NOT FOUND',
                    404,
                    request.url
                )
            )
        }


        const decodedRefreshToken = await jsonWebToken.verify(
            foundUser.refreshToken,
            config.REFRESH_TOKEN.secretKey
        )

        const payload = createUserPayLoad(foundUser)

        const newToken = createToken(payload)

        response.send({
            message: 'NEW TOKEN SUCCESS',
            token: newToken
        })

    } catch (error) {
        next(
            createErrorMessage(
                'AUTH FAIL',
                401,
                request.url
            )
        )
    }

}


exports.logout = async function (request, response, next) {
    const { userId } = request.body
    console.log(userId, 'USER LOG OUT')

    try {
        const foundUser = await userService.findUserById(userId)

        if (!foundUser) {
            next(
                createErrorMessage(
                    'NOT FOUND',
                    404,
                    request.url
                )
            )
        }

        foundUser.refreshToken = null
        await userService.saveUser(foundUser)

        response.status(200).send({
            message: 'LOGOUT SUCCESS'
        })

    } catch (error) {
        next(
            createErrorMessage(
                'LOG OUT FAIL',
                500,
                request.url
            )
        )
    }
}


exports.userUpDateProfile = async function (request, response, next) {
    let propertyName = request.body.propertyname
    let value = request.body.value

    if (propertyName === 'imagePath' && request.file) {
        value = createImagePath(request)
    }

    console.log(propertyName, value)
    // NEED CREATE NEW TOKEN OR LOGOUT

    try {
        let result
        if (propertyName === 'email') {
            result = await userService.userUpDateEmail(
                request.userData.userId,
                value
            )
        } else {
            result = await userService.userUpDateProfile(
                request.userData.userId,
                propertyName,
                value
            )
        }

        if (result.n > 0 && result.nModified) {
            if (propertyName === 'userName' || propertyName === 'imagePath') {
                const upDateImageOnPosts = await postsService.upDateInfoPostCreator(
                    request.userData.userId,
                    propertyName,
                    value
                )
                const upDateComments = await postsService.upDateInfoCommentOfCreator(
                    request.userData.userId,
                    propertyName,
                    value
                )
            }
            response.status(200).send({
                message: 'OK PROFILE UPDATE'
            })
        }

        else {
            console.log('NOTHIG TO UPDATE')
            next(
                createErrorMessage(
                    'NOT NEW INFO FOR UPDATE',
                    403,
                    request.url
                )
            )
        }
    } catch (error) {
        next(
            createErrorMessage(
                'UPDATE PROFILE FAIL POSSIBLE USER EXSIT',
                500,
                request.url
            )
        )
    }

}



