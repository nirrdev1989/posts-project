const jsonWebToken = require('jsonwebtoken')
const config = require('../config/config')

function authToken(request, response, next) {

    console.log('AUTH TOKEN MIDDLEWERE')

    try {
        const token = request.headers.authorization.split(' ')[1]

        const decodedToken = jsonWebToken.verify(token, config.ACCESSE_TOKEN.secretKey)

        request.userData = {
            userEmail: decodedToken.userEmail,
            userId: decodedToken.userId,
            userName: decodedToken.userName,
            userImagePath: decodedToken.userImagePath
        }

        next()

    } catch (error) {
        response.status(401).send({
            // message: 'Unauthorized',
            url: request.url
        })
    }

}


module.exports = {
    authToken
}