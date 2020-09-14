const postsService = require('../services/posts.db')
const { PostModel } = require('../sceama-models/postschema');
const { createImagePath } = require('../services/image.path')
const { createErrorMessage } = require('../middleweres/handle.api.error')



exports.getPosts = async (request, response, next) => {
    const pageSize = Number(request.query.pageSize);
    const currentPage = Number(request.query.currentPage)

    try {
        const postsFiltred = await postsService.filtredPosts(pageSize, currentPage)

        const postsCount = await postsService.getCountPosts()

        response.status(200).send({
            message: 'OK POSTS GET',
            posts: postsFiltred.reverse(),
            maxCount: postsCount
        })
    } catch (error) {
        next(
            createErrorMessage(
                'GET POSTS FAIL Middle',
                500,
                request.url
            )
        )
    }

}


exports.getSinglePost = async (request, response, next) => {
    const { id } = request.params

    try {
        const post = await postsService.getSinglePost(id)
        if (post) {
            response.status(200).send(post)
        } else {
            next(
                createErrorMessage(
                    'POST NOT FOUND',
                    404,
                    request.url
                )
            )
        }
    } catch (error) {
        next(
            createErrorMessage(
                'GET POST FAIL',
                500,
                request.url
            )
        )
    }
}


exports.addPost = async (request, response, next) => {
    let imagePath = createImagePath(request)

    const { title, text } = request.body
    const { userId, userImagePath, userName } = request.userData

    const newPost = new PostModel({
        title: title,
        text: text,
        imagePath: imagePath,
        creator: userId,
        creatorImagePath: userImagePath,
        userName: userName
    })


    try {
        const result = await postsService.addPost(newPost)

        response.status(200).send({
            message: 'OK POST ADD',
        })
    } catch (error) {
        next(
            createErrorMessage(
                'CREACTE POST FAIL',
                500,
                request.url
            )
        )
    }

}


exports.deletePost = async (request, response, next) => {
    const { id } = request.params
    const { userId } = request.userData

    try {
        const result = await postsService.deletePost(id, userId)

        if (result.n > 0) {
            response.status(200).send({
                message: 'OK POST DELETE'
            })
        } else {
            next(
                createErrorMessage(
                    'NOT AUTHORIZED',
                    500,
                    request.url
                )
            )

        }
    } catch (error) {
        next(
            createErrorMessage(
                'DELETE POST FAIL',
                500,
                request.url
            )
        )
    }
}


exports.updatePost = async (request, response, next) => {
    let imagePath = createImagePath(request)

    const { title, text } = request.body
    const { userId, userName } = request.userData

    const post = {
        title: title,
        text: text,
        imagePath: imagePath || request.body.imagePath,
        creator: request.userData.userId,
        userName: userName
    }

    try {
        const result = await postsService.upDatePost(request.params.id, userId, post)
        // console.log(result)
        if (result.n > 0 && result.nModified) {
            response.status(200).send({
                message: 'OK POST UPDATE'
            })
        } else {
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
                'UPDATE POST FAIL',
                500,
                request.url
            )
        )
    }

}


exports.addCommentToPost = async function (request, response, next) {
    const { text } = request.body
    const { userId, userName, userImagePath } = request.userData

    console.log(userId, userName, userImagePath)

    try {
        const post = await postsService.addCommentsOfPost(
            request.params.id,
            userId,
            userName,
            text,
            userImagePath
        )

        response.status(200).send({
            message: 'OK COMMENT ADD',
            comment: post.comments[post.comments.length - 1]
        })
    } catch (error) {
        next(
            createErrorMessage(
                'COMMENT ADD FAIL',
                500,
                request.url
            )
        )
    }

}


exports.deleteCommentFromPost = async function (request, response, next) {
    const { id, commentId } = request.params
    const { userId } = request.userData

    try {
        const result = await postsService.deleteCommentFromPost(id, commentId, userId)

        response.status(200).send({
            message: 'DELETE COMMENT OK'
        })
    } catch (error) {
        next(
            createErrorMessage(
                'COMMENT DELETE FAIL',
                500,
                request.url
            )
        )
    }

}


