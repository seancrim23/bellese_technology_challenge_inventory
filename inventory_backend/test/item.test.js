const request = require('supertest');
const app = require('../src/index');
const Item = require('../src/models/item');
const { itemOne, itemOneId, setupDatabase } = require('./utils/db');

beforeEach(setupDatabase);

test('Should successfully create a new item', async () => {
    const response = await request(app).post('/items').field({
        name: 'test name 1',
        imageName: 'test image name 1',
        description: 'test description 1'
    })
    .attach('imageData', './test/assets/images/nice_truck.jpg')
    .expect(201);

    console.log(response.body);

    const item = await Item.findById(response.body._id);
    expect(item).not.toBeNull();

    expect(response.body).toMatchObject({
        item: {
            name: 'test name 1',
            description: 'test description 1',
            imageName: 'test image name 1',
            imageData: 'nice_truck.jpg'
        }
    });
});
/*
    have to test
    - add
    - get
    - delete
    -update
*/