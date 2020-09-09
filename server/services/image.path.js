function createImagePath(request) {
    let imagePath
    if (request.file) {
        const url = request.protocol + '://' + request.get('host')
        imagePath = url + "/images/" + request.file.filename
        return imagePath
    }

    return undefined
}

module.exports = {
    createImagePath
}