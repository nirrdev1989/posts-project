const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const config = require('../config/config')


async function hashPassword(password) {
    if (!password) throw ''
    return await bcrypt.hash(password, 10)
}


async function comparePassword(password, userPassword) {
    if (!password || !userPassword) throw ''
    return await bcrypt.compare(password, userPassword)
}


function createUserPayLoad(user) {
    return {
        userEmail: user.email,
        userId: user._id,
        userName: user.profile.userName,
        userImagePath: user.profile.imagePath
    }
}

function createRefreshToken(payload) {
    if (Object.keys(payload).length === 0) throw ''
    return jsonWebToken.sign(payload, config.REFRESH_TOKEN.secretKey, {
        expiresIn: config.REFRESH_TOKEN.expiresIn
    })
}

function createToken(payload) {
    if (Object.keys(payload).length === 0) throw ''
    return jsonWebToken.sign(payload, config.ACCESSE_TOKEN.secretKey, {
        expiresIn: config.ACCESSE_TOKEN.expiresIn
    })
}


// function verifyToken(token, secretLey) {
//     if (!token || !secretLey) throw ''
//     return jsonWebToken.verify(token, secretLey)
// }


module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    createUserPayLoad,
    createRefreshToken
}