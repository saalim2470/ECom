var multer = require('multer')

const multerStorage = (folderName) => {
    return multer.diskStorage(
        {
        // destination: function (req, file, cb) {
        //     cb(null, `./uploads/${folderName}`)
        // },
        // filename: function (req, file, cb) {
        //     cb(null, Date.now() + '-' + file.originalname) // Unique filename
        // }
        }
    )
}

module.exports = { multerStorage }