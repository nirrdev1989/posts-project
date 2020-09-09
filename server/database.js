const mongoose = require('mongoose')
const config = require('./config/config')


const url = config.MONGO.url;


async function connectMongoDB(request, response, next) {

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Connect to database')

        // next()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}


module.exports = { connectMongoDB }