const request = require('supertest');
const app = require('../src/index');
const Item = require('../src/models/item');
const { itemOne, itemOneId, itemTwo, itemTwoId, itemThree, itemThreeId, setupDatabase } = require('./utils/db');
 //LOOK INTO REFACTORING WITH MOCHA
beforeEach(setupDatabase);

const itemTestData = {
    name: 'test name 1',
    imageName: 'test image name 1',
    description: 'test description 1',
    fileName: 'test_image_1.jpg'
};

test('The add endpoint (POST /items) should successfully create a new item when we pass it data', async () => {

    const testCaseRunDate = new Date(parseInt(Date.now())).toString();
    const response = await request(app).post('/items').field({
        name: itemTestData.name,
        imageName: itemTestData.imageName,
        description: itemTestData.description
    })
    .attach('imageData', `./test/assets/images/${itemTestData.fileName}`)
    .expect(201);

    const item = await Item.findById(response.body._id);
    expect(item).not.toBeNull();

    const splitDateName = (response.body.imageData).split("-");
    const uploadedTestFileDate = new Date(parseInt(splitDateName[0])).toString();
    const uploadedTestFileName = splitDateName[1];

    expect(response.body.name).toEqual(itemTestData.name);
    expect(response.body.description).toEqual(itemTestData.description);
    expect(response.body.imageName).toEqual(itemTestData.imageName);
    expect(uploadedTestFileDate).toEqual(testCaseRunDate);
    expect(uploadedTestFileName).toEqual(itemTestData.fileName);

});

test('The get endpoint (GET /items) should correctly retrieve all data (itemOne, itemTwo, itemThree) that is loaded before the test', async () => {

    const response = await request(app).get('/items').expect(200);
    const loadedTestIds = response.body.map(item => item._id); 

    expect(loadedTestIds.includes(itemOneId));
    expect(loadedTestIds.includes(itemTwoId));
    expect(loadedTestIds.includes(itemThreeId));

});

test('The delete endpoint (DELETE /items/:id) should delete the correct data that was loaded into the database before the test', async () => {

    const response = await request(app).delete(`/items/${itemOneId}`).expect(200);
    const deletedItemId = response.body._id;
    const searchItem = await Item.findById(deletedItemId);
    expect(searchItem).toBeNull();

});

test('The update endpoint (PATCH /items/:id) should update the selected item with the data that is passed to it.', async () => {

    const testCaseRunDate = new Date(parseInt(Date.now())).toString();
    const updateItemResponse = await request(app).patch(`/items/${itemOneId}`).field({
        name: itemTestData.name,
        description: itemTestData.description,
        imageName: itemTestData.imageName
    })
    .attach('imageData', `./test/assets/images/${itemTestData.fileName}`)
    .expect(200);

    expect(updateItemResponse).not.toBeNull();
    const updatedItem = await Item.findById(itemOneId);

    const splitDateName = (updatedItem.imageData).split("-");
    const uploadedTestFileDate = new Date(parseInt(splitDateName[0])).toString();
    const uploadedTestFileName = splitDateName[1];

    expect(updatedItem).not.toBeNull();
    expect(updatedItem.name).toEqual(itemTestData.name);
    expect(updatedItem.description).toEqual(itemTestData.description);
    expect(updatedItem.imageName).toEqual(itemTestData.imageName);
    expect(uploadedTestFileDate).toEqual(testCaseRunDate);
    expect(uploadedTestFileName).toEqual(itemTestData.fileName);

});

test('The get one item endpoint (GET /items/:id) should retrieve the expected item when passed the items id', async () => {

    const getOneItemResponse = await request(app).get(`/items/${itemOneId}`).expect(200);
    expect(getOneItemResponse).not.toBeNull();

    expect(getOneItemResponse.body.imageName).toEqual(itemOne.imageName);
    expect(getOneItemResponse.body._id == itemOne._id).toBe(true);
    expect(getOneItemResponse.body.name).toEqual(itemOne.name);
    expect(getOneItemResponse.body.description).toEqual(itemOne.description);
    expect(getOneItemResponse.body.imageData).toEqual(itemOne.imageData);

});
