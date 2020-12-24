const express = require('express');
const Record = require('../models/record');
const { findEmployee, findBag } = require('../functions');
const router = express.Router();

// create
router.post('/api/employees/:id/records', async (req, res) => {
    try {
        const { bag: bagID, numOfFoldBags, numOfPasteBags } = req.body;
        const employee = await findEmployee(req.params.id);
        const { bag, wage } = await findBag(bagID, numOfFoldBags, numOfPasteBags);

        const record = new Record({
            ...req.body,
            bag: bag._id,
            employee: employee._id,
            wage
        });

        await record.save();
        employee.records = employee.records.concat(record);
        await employee.save();

        res.status(201).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read all
router.get('/api/employees/:employeeID/records', async (req, res) => {
    try {
        const records = await Record.find({ employee: req.params.employeeID });

        res.status(200).send(records);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read one
router.get('/api/employees/:employeeID/records/:recordID', async (req, res) => {
    try {
        const record = await Record.findOne({ _id: req.params.recordID, employee: req.params.employeeID });

        if (!record) {
            return res.status(404).send('Record not found!');
        }

        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

// update
router.patch('/api/employees/:employeeID/records/:recordID', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date'];
    const isValidation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidation) {
        return res.status(400).send('Invalid Updates');
    }


    try {
        const record = await Record.findOne({ _id: req.params.recordID, employee: req.params.employeeID });

        if (!record) {
            return res.status(404).send(record);
        }

        updates.forEach((update) => {
            record[update] = req.body[update];
        });

        await record.save();

        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete
router.delete('/api/employees/:employeeID/records/:recordID', async (req, res) => {
    try {
        const record = await Record.findOneAndDelete({ _id: req.params.recordID, employee: req.params.employeeID });

        if (!record) {
            return res.status(404).send('Record not found!');
        }

        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;