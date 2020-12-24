const express = require('express');
const Supervisor = require('../models/supervisor');

const router = express.Router();

// create
router.post('/api/supervisors', async (req, res) => {
    try {
        const supervisor = new Supervisor(req.body);
        await supervisor.save();

        res.status(201).send(supervisor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read all
router.get('/api/supervisors', async (req, res) => {
    try {
        const supervisors = await Supervisor.find({});

        res.status(200).send(supervisors);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read one
router.get('/api/supervisors/:id', async (req, res) => {
    try {
        const _id = req.params.id;

        const supervisor = await Supervisor.findOne({ _id });

        if (!supervisor) {
            return res.status(404).send('Supervisor not found');
        }

        res.status(200).send(supervisor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// update
router.patch('/api/supervisors/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['fullName', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates' });
        }

        const _id = req.params.id;

        const supervisor = await Supervisor.findOne({ _id });

        if (!supervisor) {
            return res.status(404).send('Supervisor not found');
        }

        updates.forEach((update) => supervisor[update] = req.body[update]);
        await supervisor.save();

        res.status(200).send(supervisor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete
router.delete('/api/supervisors/:id', async (req, res) => {
    try {
        const supervisor = await Supervisor.findOneAndDelete({ _id: req.params.id });

        if (!supervisor) {
            return res.status(404).send('supervisor not found!');
        }

        res.status(200).send(supervisor);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

