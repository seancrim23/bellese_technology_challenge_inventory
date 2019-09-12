const express = require('express');
const Item = require('../models/item');
const fs = require('fs');

const itemRouter = express.Router();

itemRouter.get('/items', async (req, res) => {
    try{
        const items = await Item.find({});
        res.send(items);
    } catch(e) {
        res.status(500).send(e);
    }
});

itemRouter.get('/items/:id', async (req, res) => {
    const itemId = req.params.id;

    try{
        const item = await Item.findById({ _id: itemId });
        if(!item){
            throw new Error('Cannot find item! Please check that you are using the correct ID!');
        }

        res.send(item);
    }catch(e){
        res.status(404).send(e);
    }
});

itemRouter.post('/items', async (req, res) => {
    const item = new Item(req.body);

    item.image.data = fs.readFileSync(req.body.image);
    const fileExtension = (req.body.image).split('.').pop();
    item.image.contentType = `image/${fileExtension}`;

    try{
        await item.save();
        res.status(201).send(item);
    } catch(e) {
        res.status(500).send(e);
    }
});

itemRouter.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;

    try{
        const item = await Item.findByIdAndDelete({ _id: itemId });
        if(!item){
            throw new Error('Cannot find item! Please check that you are using the correct ID!');
        }

        res.send(item);
    }catch(e){
        res.status(404).send(e);
    }
});

itemRouter.patch('/items/:id', async (req, res) => {
    const bodyKeys = Object.keys(req.body);
    const validProps = ['name', 'description', 'image'];
    const isValidUpdate = bodyKeys.every(key => validProps.includes(key));

    try{
        const item = await Item.findById({ _id: req.params.id });
        if(!item){
            throw new Error('Cannot find item for update!');
        }

        if(!isValidUpdate){
            throw new Error('Invalid values for update! Please send correct values!');
        }

        bodyKeys.forEach(key => { 
            if(key === 'image'){
                item[key].data = fs.readFileSync(req.body[key]);
                const fileExtension = (req.body.image).split('.').pop();
                item.image.contentType = `image/${fileExtension}`;
            } else {
                item[key] = req.body[key];
            }
        });
        await item.save();
        res.send(item);
    }catch(e){
        res.status(404).send({ error: e.message });
    }
});

module.exports = itemRouter;