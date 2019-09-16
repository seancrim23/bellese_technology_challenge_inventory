const express = require('express');
const Item = require('../models/item');
const fs = require('fs');
const { upload } = require('../utils/multerUtils');

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

itemRouter.post('/items', upload.single('imageData'), async (req, res, next) => {
    try{
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            imageName: req.body.imageName,
            imageData: req.file.filename
        });

        await item.save();
        res.status(201).send(item);
    } catch(e) {
        res.status(500).send(e.message);
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

itemRouter.patch('/items/:id', upload.single('imageData'), async (req, res) => {
    const bodyKeys = Object.keys(req.body);
    const validProps = ['name', 'description', 'imageName'];
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
            item[key] = req.body[key];
        });
        if(req.file){
            item['imageData'] = req.file.filename;
        }
        await item.save();
        res.send(item);
    }catch(e){
        res.status(404).send({ error: e.message });
    }
});

module.exports = itemRouter;