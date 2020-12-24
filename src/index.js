const express = require('express');
const path = require('path');
const cors = require('cors');

require('./db/mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => {
    res.json({ name: 'chanaka' });
});

app.use(express.json());
app.use(cors());

const supervisorRoute = require('./routes/supervisor');
const employeeRoute = require('./routes/employee');
const bagRoute = require('./routes/bag');
const recordRoute = require('./routes/record');
const salaryRoute = require('./routes/salary');

app.use(bagRoute);
app.use(supervisorRoute);
app.use(employeeRoute);
app.use(recordRoute);
app.use('/api/employees/', salaryRoute);

if (environment === 'production') {
    app.use(express.static('client/build'));

    app.get('*', async (req, res) => {
        res.sendFile(path.join('client/build/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});