const multer = require('multer')

const storage = multer.diskStorage({
    destination: './images',
    filename: function (request, file, callBack) {
        callBack(null, Date.now() + '.' + file.originalname)
    }

})


module.exports = multer({ storage: storage }).single('image')
