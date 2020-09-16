const { PostModel } = require('../sceama-models/postschema')


module.exports = {
    getAllPosts: async function () {
        return await PostModel.find({})
    },
    getCountPosts: async function () {
        return await PostModel.countDocuments()
    },
    filtredPosts: async function (pageSize, currentPage) {
        // if (userId) {
        //     return await PostModel.find({ creator: userId })
        // }
        return await PostModel.aggregate([
            {
                $project: {
                    title: 1,
                    text: 1,
                    imagePath: 1,
                    creator: 1,
                    userName: 1,
                    creatorImagePath: 1,
                    dateCreated: 1,
                    commentsLength: {
                        $cond: {
                            if: {
                                $isArray: "$comments"
                            },
                            then: {
                                $size: "$comments"
                            }, else: "NA"
                        }
                    }
                },
            },
        ])
            .sort({ _id: -1 })
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    },
    getSinglePost: async function (id) {
        return await PostModel.findById({ _id: id })
    },
    deletePost: async function (id, userId) {
        return await PostModel.deleteOne({ _id: id, creator: userId })
    },
    addPost: async function (newPost) {
        return await newPost.save()
    },
    upDatePost: async function (id, userId, post) {
        return await PostModel.updateOne(
            {
                _id: id,
                creator: userId
            },
            post
        )
    },
    upDateInfoPostCreator: async function (userId, propertyName, value) {
        if (propertyName === 'imagePath') propertyName = 'creatorImagePath'
        let options = {}
        options[propertyName] = value
        return await PostModel.updateMany(
            {
                creator: userId
            },
            {
                $set: options,
            }
        )
    },
    upDateInfoCommentOfCreator: async function (userId, propertyName, value) {
        let options = {}
        options["comments.$[property]." + propertyName] = value

        return await PostModel.updateMany(
            {
                "comments": {
                    $elemMatch: {
                        creator: userId
                    }
                }
            },
            {
                $set: options
            },
            {
                arrayFilters: [
                    {
                        "property.creator": userId
                    }
                ]
            }
        )
    },
    addCommentsOfPost: async function (id, userId, userName, text, imagePath) {
        return await PostModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $push: {
                    comments: {
                        text: text,
                        creator: userId,
                        userName: userName,
                        imagePath: imagePath
                    }
                }
            },
            {
                upsert: true,
                new: true
            }
        )
    },
    deleteCommentFromPost: async function (postId, commentId, userId) {
        return await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $pull: {
                    comments: {
                        _id: commentId,
                        creator: userId
                    }
                }
            }
        )
    }

}
