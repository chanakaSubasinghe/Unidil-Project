// requiring dependencies and models
const express = require('express');
const Employee = require('../models/employee');
const Supervisor = require('../models/supervisor');

// defining router
const router = express.Router();


/** 
* * @route   POST api/:supervisorID/employees
* * @desc    Create new employee
* ! @access  Private      
*/

router.post('/:supervisorID/employees', async (req, res) => {
    try {

        // find
        const supervisor = await Supervisor.findOne({ _id: req.params.supervisorID });

        // condition
        if (!supervisor) {
            // send response with status code
            res.status(404).send('Supervisor not found');
        }

        // insert
        const employee = await new Employee({
            ...req.body,
            supervisor: supervisor._id
        });

        // save
        await employee.save();

        // assign
        supervisor.employees = supervisor.employees.concat(employee);

        // save
        supervisor.save();

        // send response with status code
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});


/** 
* * @route   GET api/:supervisorID/employees
* * @desc    GET All employees
* * @access  Public      
*/

router.get('/:supervisorID/employees', async (req, res) => {
    try {
        // find 
        const supervisor = await Supervisor.findOne({ _id: req.params.supervisorID });

        // condition
        if (!supervisor) {
            // send response with status code
            return res.status(404).send('Supervisor not found!');
        }

        // find
        await supervisor.populate('employees').execPopulate();

        // send response with status code
        res.status(200).send(supervisor.employees);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});


/** 
* * @route   GET api/:supervisorID/employees/:id
* * @desc    GET employee
* * @access  Public      
*/

router.get('/:supervisorID/employees/:id', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.id, supervisor: req.params.supervisorID });

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
* * @route   Patch api/:supervisorID/employees/:id
* * @desc    Update employee
* ! @access  Private      
*/

router.patch('/:supervisorID/employees/:id', async (req, res) => {

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
        const employee = await Employee.findOne({ _id: req.params.id, supervisor: req.params.supervisorID });

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
* * @route   DELETE api/:supervisorID/employees/:id
* * @desc    Delete employees
* ! @access  Private      
*/

router.delete('/:supervisorID/employees/:id', async (req, res) => {
    try {
        // find and delete 
        const employee = await Employee.findOneAndDelete({ _id: req.params.id, supervisor: req.params.supervisorID });

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