const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    creatorImagePath: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String
    },
    commentsLength: {
        type: Number
    },
    comments: {
        type: [{
            text: {
                type: String,
                required: true
            },
            creator: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            imagePath: {
                type: String
            },
            dateCreated: {
                type: Date,
                default: Date.now
            },
        }],
    }
})


const PostModel = mongoose.model('posts', postSchema)


module.exports = { PostModel }