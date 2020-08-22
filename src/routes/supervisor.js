// requiring dependencies
const express = require('express');

// defining router
const router = express.Router();

// importing models
const Supervisor = require('../models/supervisor');

/** 
* * @route   POST api/supervisors
* * @desc    Create new supervisor
* ! @access  None      
* TODO: after create a new document, please comment or delete this route
*/

router.post('/supervisors', async (req, res) => {
    try {
        // insert new document into the database
        const supervisor = new Supervisor(req.body);

        // save 
        await supervisor.save();

        // send response with status code
        res.status(201).send(supervisor);
    } catch (error) {
        // send error with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/supervisors
* * @desc    Get all supervisors
* ! @access  None      
* TODO: after create a new document, please comment or delete this route
*/


router.get('/api/supervisors', async (req, res) => {
    try {
        // retrieve all supervisor 
        const supervisors = await Supervisor.find({});

        // send response with status code
        res.status(200).send(supervisors);
    } catch (error) {
        // send response with error
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/supervisors/:id
* * @desc    Get specific supervisor
* ! @access  Private
*/


router.get('/api/supervisors/:id', async (req, res) => {
    try {
        // declaring provided id
        const _id = req.params.id;

        // find specific supervisor by id
        const supervisor = await Supervisor.findOne({ _id });

        // condition
        if (!supervisor) {
            return res.status(404).send('Supervisor not found');
        }

        // send response with status code
        res.status(200).send(supervisor);
    } catch (error) {
        // send response with error
        res.status(400).send(error);
    }
});

/** 
* * @route   Patch api/supervisors/:id
* * @desc    Update specific supervisor
* ! @access  Private
*/


router.patch('/api/supervisors/:id', async (req, res) => {
    try {
        // declaring variables
        const updates = Object.keys(req.body);
        const allowedUpdates = ['fullName', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));


        // condition
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates' });
        }

        // declaring provided id
        const _id = req.params.id;

        // find supervisor by provided id
        const supervisor = await Supervisor.findOne({ _id });

        // condition
        if (!supervisor) {
            // send response with error
            return res.status(404).send('Supervisor not found');
        }
        // update fields
        updates.forEach((update) => supervisor[update] = req.body[update]);

        // save supervisor
        await supervisor.save();

        // send response with status code
        res.status(200).send(supervisor);
    } catch (error) {
        // send response with error 
        res.status(400).send(error);
    }
});

/** 
* * @route   Delete api/supervisors/:id
* * @desc    Delete specific supervisor
* ! @access  Private
* TODO: after create a new document, please comment or delete this route
*/


router.delete('/api/supervisors/:id', async (req, res) => {
    try {
        // find supervisor by provided id
        const supervisor = await Supervisor.findOneAndDelete({ _id: req.param.id });

        // condition
        if (!supervisor) {
            return res.status(404).send('supervisor not found!');
        }

        // send response with status code
        res.status(200).send(supervisor);
    } catch (error) {
        // send response with error 
        res.status(400).send(error);
    }
});

// export router
module.exports = router;

