// requiring dependencies and models
const express = require('express');
const Record = require('../models/record');
const Employee = require('../models/employee');

// defining router
const router = express.Router();

/** 
* * @route   POST api/employees/:id/records
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
        const record = await new Record(req.body);

        // save
        await record.save();

        // assign record
        employee.records.push(record);

        // save
        employee.save();

        // send response with status
        res.status(201).send(record);
    } catch (error) {
        // send response with status
        res.status(400).send(error);
    }
});


// export router
module.exports = router;