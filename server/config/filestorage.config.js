const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: path.join(__dirname + './../public/upload/img/'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ' - ' + Date.now() + path.extname(file.originalname));
    }
})

const pdfStorage = multer.diskStorage({
    destination: path.join(__dirname + './../public/upload/pdf/'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ' - ' + Date.now() + path.extname(file.originalname));
    }
})

let destinationToImage = multer({ dest: imageStorage });
let destinationToPDF = multer({ dest: pdfStorage });

module.exports = {
    destinationToImage: destinationToImage,
    destinationToPDF: destinationToPDF
}
