// requiring dependencies and models
const express = require('express');
const Employee = require('../models/employee');
const Supervisor = require('../models/supervisor');

// defining router
const router = express.Router();


/** 
* * @route   POST api/employees
* * @desc    Create new employee
* ! @access  Private      
*/

router.post('/', async (req, res) => {
    try {

        // insert
        const employee = await new Employee(req.body);

        // save
        await employee.save();

        // send response with status code
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});


/** 
* * @route   GET api/employees
* * @desc    GET All employees
* * @access  Public      
*/

router.get('/', async (req, res) => {
    try {
        // find 
        const employees = await Employee.find({});

        // send response with status code
        res.status(200).send(employees);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});


/** 
* * @route   GET api/employees/:id
* * @desc    GET employee
* * @access  Public      
*/

router.get('/:id', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.id });

        // condition
        if (!employee) {
            // send response with status code
            res.status(404).send('Employee not found');
        }

        // send response with status code
        res.status(200).send(employee);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }

});

/** 
* * @route   Patch api/employees/:id
* * @desc    Update employee
* ! @access  Private      
*/

router.patch('/:id', async (req, res) => {

    // declaring variables
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fullName', 'contactNumber', 'role', 'isActive'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    // condition
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' });
    }

    try {
        // find 
        const employee = await Employee.findOne({ _id: req.params.id });

        // condition
        if (!employee) {
            // send response with error
            return res.status(404).send('Employee not found');
        }

        // updating fields
        updates.forEach((update) => employee[update] = req.body[update]);

        // save
        await employee.save();

        // send response with status code
        res.status(200).send(employee);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   DELETE api/employees/:id
* * @desc    Delete employees
* ! @access  Private      
*/

router.delete('/:id', async (req, res) => {
    try {
        // find and delete 
        const employee = await Employee.findOneAndDelete({ _id: req.params.id });

        // condition
        if (!employee) {
            // send response with status code
            res.status(404).send('Employee not found');
        }

        // send response with status code
        res.status(200).send(employee);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

// export router
module.exports = router;