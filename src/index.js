// requiring dependencies
const express = require('express');
const path = require('path');

// requiring DB
require('./db/mongoose');

const app = express();

// defining the PORT
const PORT = process.env.PORT || 5000;

// define the current environment
const environment = process.env.NODE_ENV || 'development';

// use JSON
app.use(express.json());


// importing routes
const supervisorRoute = require('./routes/supervisor');
const employeeRoute = require('./routes/employee');
const bagRoute = require('./routes/bag');

// using imported routes
app.use('/api/supervisors/', supervisorRoute);
app.use('/api/employees/', employeeRoute);
app.use('/api/bags/', bagRoute);


// serve static assets if in production
if (environment === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', async (req, res) => {
        res.sendFile(path.join('client/build/index.html'));
    });
}

app.get('/', (req, res) => {
    res.json({ name: 'chanaka' });
});

// server listener
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});