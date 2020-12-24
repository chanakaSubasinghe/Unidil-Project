// requiring dependencies and models
const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

// create
router.post('/api/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);

        await employee.save();

        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// read all
router.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});

        res.status(200).send(employees);
    } catch (error) {
        res.status(400).send(error);
    }
});

// rad one
router.get('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });

        if (!employee) {
            res.status(404).send('Employee not found');
        }

        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }

});

// update
router.patch('/api/employees/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fullName', 'contactNumber', 'role', 'isActive'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' });
    }

    try {
        const employee = await Employee.findOne({ _id: req.params.id });

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        updates.forEach((update) => employee[update] = req.body[update]);

        await employee.save();

        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete
router.delete('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ _id: req.params.id });

        if (!employee) {
            res.status(404).send('Employee not found');
        }

        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;