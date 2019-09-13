const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('DESTINATION FUNCTION');
        cb(null, '../inventory_ui/public/images');
    },
    filename: function (req, file, cb) {
        console.log('FILENAME FUNCTION');
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    console.log('FILEFILTERING');
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    } else {
        //reject storage of file
        cb(null, false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = {
    upload
};
