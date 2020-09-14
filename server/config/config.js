require('dotenv/config')
module.exports = {
    MONGO: {
        url: process.env.MONGO_URI
    },
    ACCESSE_TOKEN: {
        seconds: 60 * 5,
        expiresIn: '5m',
        secretKey: process.env.ACCESSE_TOKEN_SECRET_KEY
    },
    REFRESH_TOKEN: {
        seconds: 3600 * 3,
        expiresIn: '3h',
        secretKey: process.env.REFRESH_TOKEN_SECRET_KEY
    }
}