// requiring dependencies
const express = require('express');

// requiring DB
require('./db/mongoose');

const app = express();

// defining the PORT
const PORT = process.env.PORT || 5000;

// use JSON
app.use(express.json());

// server listener
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})