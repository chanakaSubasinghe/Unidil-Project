// requiring dependencies and models
const express = require('express');
const Employee = require('../models/employee');
const Salary = require('../models/salary');

// defining router
const router = express.Router();

/** 
* * @route   POST api/employees/:employeeID/salaries
* * @desc    Create new salary
* ! @access  Private      
*/

router.post('/:employeeID/salaries', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found!');
        }

        // insert
        const salary = await new Salary({
            ...req.body,
            employee: employee._id
        });

        // save
        await salary.save();

        // assign
        employee.salaries = employee.salaries.concat(salary);

        // save
        await employee.save();

        // send response with status code
        res.status(201).send(salary);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/employees/:employeeID/salaries
* * @desc    Get all salaries
* ! @access  Private      
*/

router.get('/:employeeID/salaries', async (req, res) => {
    try {
        // find
        const salaries = await Salary.find({ employee: req.params.employeeID });


        // send response with status code
        res.status(200).send(salaries);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/employees/:employeeID/salaries/:salaryID
* * @desc    Get salary
* ! @access  Private      
*/

router.get('/:employeeID/salaries/:salaryID', async (req, res) => {
    try {

        // find
        const salary = await Salary.findOne({ _id: req.params.salaryID, employee: req.params.employeeID });

        // condition
        if (!salary) {
            // send response with status code
            return res.status(404).send('Salary not found!');
        }

        // send response with status code
        res.status(200).send(salary);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});


/** 
* * @route   POST api/employees/:employeeID/salaries/:salaryID
* * @desc    Create new salary
* ! @access  Private      
*/

router.patch('/:employeeID/salaries/:salaryID', async (req, res) => {

    // declaring variables
    const updates = Object.keys(req.body);
    const allowedUpdates = ['month', 'numOfFoldBags', 'numOfPasteBags'];
    const isValidation = updates.every((update) => allowedUpdates.includes(update));

    // condition
    if (!isValidation) {
        // send response with status code
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        // find
        const salary = await Salary.findOne({ _id: req.params.salaryID, employee: req.params.employeeID });

        // update
        updates.forEach((update) => {
            salary[update] = req.body[update];
        });

        // save
        await salary.save();

        // send response with status code
        res.status(200).send(salary);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   DELETE api/employees/:employeeID/salaries/:salaryID
* * @desc    Delete salary
* ! @access  Private      
*/

router.delete('/:employeeID/salaries/:salaryID', async (req, res) => {
    try {


        // find
        const salary = await Salary.findOneAndDelete({ _id: req.params.salaryID, employee: req.params.employeeID });

        // condition
        if (!salary) {
            // send response with status code
            return res.status(404).send('Salary not found!');
        }

        // send response with status code
        res.status(200).send(salary);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});


// export router
module.exports = router;