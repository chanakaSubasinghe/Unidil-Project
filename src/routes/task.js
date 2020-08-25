// requiring dependencies and models
const express = require('express');
const Task = require('../models/task');
const Record = require('../models/record');
const Employee = require('../models/employee');

// defining router
const router = express.Router();

/** 
* * @route   POST api/employees/:employeeID/records/:recordID/tasks
* * @desc    Create new task
* ! @access  Private      
*/

router.post('/:employeeID/records/:recordID/tasks', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found!');
        }

        // find
        const record = await Record.findOne({ _id: req.params.recordID, employee: employee._id });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found!');
        }

        // insert 
        const task = await new Task(req.body);

        // save
        await task.save();


        // assign
        await record.tasks.push(task);

        // save
        await record.save();

        // send response with status
        res.status(201).send(task);
    } catch (error) {
        // send response with status
        res.status(400).send(error);
    }
});


/** 
* * @route   GET api/employees/:employeeID/records/:recordID/tasks
* * @desc    GET all tasks
* ! @access  Private      
*/

router.get('/:employeeID/records/:recordID/tasks', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found');
        }

        // find
        const record = await Record.findOne({ _id: req.params.recordID, employee: employee._id });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found');
        }

        // find
        const tasks = await Task.find({});

        // send response with status code
        res.status(200).send(tasks);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   GET api/employees/:employeeID/records/:recordID/tasks/:taskID
* * @desc    GET task
* ! @access  Private      
*/

router.get('/:employeeID/records/:recordID/tasks/:taskID', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found');
        }

        // find
        const record = await Record.findOne({ _id: req.params.recordID, employee: employee._id });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found');
        }

        // find
        const task = await Task.findOne({ _id: req.params.taskID, record: record._id });

        // condition
        if (!task) {
            // send response with status code
            return res.status(404).send('Task not found');
        }

        // send response with status code
        res.status(200).send(task);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   PATCH api/employees/:employeeID/records/:recordID/tasks/:taskID
* * @desc    Update task
* ! @access  Private      
*/

router.patch('/:employeeID/records/:recordID/tasks/:taskID', async (req, res) => {

    // declaring variables
    const updates = Object.keys(req.body);
    const allowedUpdates = ['pasteCount', 'foldCount'];
    const isValidation = updates.every((update) => allowedUpdates.includes(update));

    // condition
    if (!isValidation) {
        // send response with status code
        return res.status(400).send('Invalid updates!');
    }

    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found');
        }

        // find
        const record = await Record.findOne({ _id: req.params.recordID, employee: employee._id });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found');
        }

        // find
        const task = await Task.findOne({ _id: req.params.taskID, record: record._id });

        // condition
        if (!task) {
            // send response with status code
            return res.status(404).send('Task not found');
        }

        // update
        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        // save
        await task.save();

        // send response with status code
        res.status(200).send(task);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

/** 
* * @route   DELETE api/employees/:employeeID/records/:recordID/tasks/:taskID
* * @desc    Delete task
* ! @access  Private      
*/

router.delete('/:employeeID/records/:recordID/tasks/:taskID', async (req, res) => {
    try {
        // find
        const employee = await Employee.findOne({ _id: req.params.employeeID });

        // condition
        if (!employee) {
            // send response with status code
            return res.status(404).send('Employee not found');
        }

        // find
        const record = await Record.findOne({ _id: req.params.recordID, employee: employee._id });

        // condition
        if (!record) {
            // send response with status code
            return res.status(404).send('Record not found');
        }

        // find
        const task = await Task.findOneAndDelete({ _id: req.params.taskID, record: record._id });

        // condition
        if (!task) {
            // send response with status code
            return res.status(404).send('Task not found');
        }

        // send response with status code
        res.status(200).send(task);
    } catch (error) {
        // send response with status code
        res.status(400).send(error);
    }
});

// export router
module.exports = router;