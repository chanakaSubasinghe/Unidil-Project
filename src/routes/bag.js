const express = require('express');
const Bag = require('../models/bag');

const router = express.Router();

// create
router.post('/api/bags', async (req, res) => {
    try {
        const bag = new Bag(req.body);

        await bag.save();

        res.status(201).send(bag);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read all
router.get('/api/bags', async (req, res) => {
    try {
        const bags = await Bag.find({});

        res.status(200).send(bags);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read one
router.get('/api/bags/:id', async (req, res) => {
    try {
        const bag = await Bag.findOne({ _id: req.params.id });

        if (!bag) {
            return res.status(404).send('Bag not found');
        }

        res.status(200).send(bag);
    } catch (error) {
        res.status(400).send(error);
    }
});

// update
router.patch('/api/bags/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'width', 'height', 'foldPrice', 'pastePrice'];
    const isValidation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidation) {
        return res.status(400).send('Invalid updates!');
    }


    try {
        const bag = await Bag.findOne({ _id: req.params.id });

        if (!bag) {
            return res.status(404).send('Bag not found!');
        }

        updates.forEach((update) => {
            bag[update] = req.body[update];
        });

        await bag.save();

        res.status(200).send(bag);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete
router.delete('/api/bags/:id', async (req, res) => {
    try {
        const bag = await Bag.findOneAndDelete({ _id: req.params.id });

        if (!bag) {
            return res.status(404).send('No bag found!');
        }

        res.status(200).send(bag);
    } catch (error) {
        res.status(400).send(error);
    }
});


// export route
module.exports = router;