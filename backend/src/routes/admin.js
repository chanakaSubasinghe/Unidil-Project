// requiring dependencies
const express = require('express')

// defining router
const router = new express.Router();

// importing models
const Admin = require('../models/admin');

// create
router.post('/api/admins', async (req, res) => {
    try {
        // insert new document into the database
        const admin = new Admin(req.body);

        // save 
        await admin.save();

        // send response with status code
        res.status(201).send(admin)
    } catch (error) {
        // send error with status code
        res.status(400).send(error)
    }
})


// export router
module.exports = router;

