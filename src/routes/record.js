// requiring dependencies and models
const express = require('express');
const Record = require('../models/record');
const Employee = require('../models/employee');

// defining router
const router = express.Router();

/** 
* * @route   POST api/employees/:employeeID/records
* * @desc    Create new record
* ! @access  Private      
*/

router.post('/:employeeID/records/', async (req, res) => {
    try {

        // find 
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found!');
        }


        // insert
        const record = await new Record({
            ...req.body,
            employee: employee._id
        });

        // save
        await record.save();

        // assign record
        employee.records = employee.records.concat(record);

        // save
        await employee.save();

        // send response with status
        res.status(201).send(record);
    } catch (error) {
        // send response with status
        res.status(400).send(error);
    }
});


/** 
* * @route   GET api/employees/:employeeID/records
* * @desc    GET all
* * @access  Public      
*/

router.get('/:employeeID/records', async (req, res) => {
    try {
        // find 
        const records = await Record.find({ employee: req.params.employeeID });


        // send response with status
        res.status(200).send(records);
    } catch (error) {
        // send response with status
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/employees/:employeeID/records/:recordID
* * @desc    GET record
* * @access  Public       
*/

router.get('/:employeeID/records/:recordID', async (req, res) => {
    try {

        // find 
        const record = await Record.findOne({ _id: req.params.recordID, employee: req.params.employeeID });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found!');
        }

        // send response with status
        res.status(200).send(record);
    } catch (error) {
        // send response with status
        res.status(400).send(error);
    }
});

/** 
* * @route   PATCH api/employees/:employeeID/records/recordID
* * @desc    Update record
* ! @access  Private  
*/

router.patch('/:employeeID/records/:recordID', async (req, res) => {

    // declaring variables
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date'];
    const isValidation = updates.every((update) => allowedUpdates.includes(update));

    // condition
    if (!isValidation) {
        // send response with status 
        return res.status(400).send('Invalid Updates');
    }


    try {

        // find
        const record = await Record.findOne({ _id: req.params.recordID, employee: req.params.employeeID });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send(record);
        }

        // update
        updates.forEach((update) => {
            record[update] = req.body[update];
        });

        //save
        await record.save();

        // send response with status code
        res.status(200).send(record);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});


/** 
* * @route   DELETE api/employees/:employeeID/records/:recordID
* * @desc    Delete record
* ! @access  Private      
*/

router.delete('/:employeeID/records/:recordID', async (req, res) => {
    try {

        // find
        const record = await Record.findOneAndDelete({ _id: req.params.recordID, employee: req.params.employeeID });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found!');
        }

        // send response with status code
        res.status(200).send(record);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

// export router
module.exports = router;