const mongoose = require('mongoose');
const Item = require('../../src/models/item');

const itemOneId = new mongoose.Types.ObjectId();
const itemOne = {
    _id: itemOneId,
    name: 'Test Item One',
    description: 'Test Item One Description',
    imageName: 'Test Image One',
    imageData: 'Test_Image_One.jpeg'
};

const itemTwoId = new mongoose.Types.ObjectId();
const itemTwo = {
    _id: itemTwoId,
    name: 'Test Item Two',
    description: 'Test Item Two Description',
    imageName: 'Test Image Two',
    imageData: 'Test_Image_Two.jpeg'
};

const itemThreeId = new mongoose.Types.ObjectId();
const itemThree = {
    _id: itemThreeId,
    name: 'Test Item Three',
    description: 'Test Item Three Description',
    imageName: 'Test Image Three',
    imageData: 'Test_Image_Three.jpeg'
};

const setupDatabase = async () => {
    await Item.deleteMany();
    await new Item(itemOne).save();
    await new Item(itemTwo).save();
    await new Item(itemThree).save();
};

module.exports = {
    itemOneId,
    itemOne,
    itemTwoId,
    itemTwo,
    itemThreeId,
    itemThree,
    setupDatabase
};





