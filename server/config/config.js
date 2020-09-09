module.exports = {
    MONGO: {
        url: 'mongodb://localhost:27017/postsdata'
    },
    ACCESSE_TOKEN: {
        seconds: 60 * 5,
        expiresIn: '5m',
        secretKey: 'SECRET_KEY_ACCESS_TOKEN'
    },
    REFRESH_TOKEN: {
        seconds: 3600 * 3,
        expiresIn: '3h',
        secretKey: 'SECRET_KEY_REFRESH_TOKEN'
    }
}