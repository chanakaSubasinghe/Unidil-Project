// requiring dependencies and models
const express = require('express');
const Bag = require('../models/bag');

// defining router
const router = express.Router();

/** 
* * @route   POST api/bags
* * @desc    Create new bag
* ! @access  Private      
*/

router.post('/', async (req, res) => {
    try {
        // insert
        const bag = await new Bag(req.body);

        // save
        await bag.save();

        // send response with status 
        res.status(201).send(bag);
    } catch (error) {
        // send response with status 
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/bags
* * @desc    GET all bags
* ! @access  Private      
*/

router.get('/', async (req, res) => {
    try {
        // retrieve all
        const bags = await Bag.find({});

        // send response with status code
        res.status(200).send(bags);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/bags/:id
* * @desc    GET bag
* ! @access  Private      
*/

router.get('/:id', async (req, res) => {
    try {
        // retrieve 
        const bag = await Bag.findOne({ _id: req.params.id });

        // condition
        if (!bag) {
            return res.status(404).send('Bag not found');
        }

        // send response with status code
        res.status(200).send(bag);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   PATCH api/bags/:id
* * @desc    Update bag
* ! @access  Private      
*/

router.patch('/:id', async (req, res) => {

    // declaring variables
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'width', 'height', 'foldPrice', 'pastePrice'];
    const isValidation = updates.every((update) => allowedUpdates.includes(update));

    // condition
    if (!isValidation) {
        return res.status(400).send('Invalid updates!');
    }


    try {
        // find 
        const bag = await Bag.findOne({ _id: req.params.id });

        // condition
        if (!bag) {
            return res.status(404).send('Bag not found!');
        }

        // update
        updates.forEach((update) => {
            bag[update] = req.body[update];
        });

        // save
        await bag.save();

        // send response with status code
        res.status(200).send(bag);
    } catch (error) {

    }
});

/** 
* * @route   DELETE api/bags':id
* * @desc    Delete bag
* ! @access  Private      
*/

router.delete('/:id', async (req, res) => {
    try {
        // find
        const bag = await Bag.findOneAndDelete({ _id: req.params.id });

        // condition
        if (!bag) {
            return res.status(404).send('No bag found!');
        }

        // send response with status code
        res.status(200).send(bag);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});


// export route
module.exports = router;