function createErrorMessage(text, status, url) {
    console.log(text, status, url)
    const error = new Error(text)
    error.status = status
    error.url = url
    return error
}

function urlError(request, response, next) {
    console.log(' URL ERROR ')
    const error = new Error('URL ERROR')
    error.status = 404
    error.url = request.url
    next(error)
}

function handleApiError(error, request, response, next) {
    console.log(' HANDLE API ERROR MESSAGE')
    response.status(error.status || 500)
    response.send({
        message: error.message || 'AN UNKNOW ERROR',
        url: error.url,
        status: error.status
    })
}




module.exports = {
    // errorMessage,
    handleApiError,
    // handleOperationError,
    createErrorMessage,
    urlError
}