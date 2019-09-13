const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageName: {
        type: String,
        default: 'none',
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

/*original image storage
    image: {
        data: Buffer,
        contentType: String
    }
*/

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;