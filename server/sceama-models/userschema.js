const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    },
    profile: {
        userName: {
            type: String,
            required: true
        },
        genus: {
            type: String,
            required: true
        },
        birthday: {
            type: String,
            required: true

        },
        imagePath: {
            type: String,
            required: true
        }
    }
})


userSchema.plugin(uniqueValidator)


const UserModel = mongoose.model('users', userSchema)


module.exports = { UserModel }