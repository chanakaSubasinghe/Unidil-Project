// requiring dependencies
const mongoose = require('mongoose');

// define schema
const Schema = mongoose.Schema;

// creating new schema
const recordSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    wage: {
        type: Number,
        default: 0
    },
    tasks: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
},
    {
        timestamps: true
    }
);

// compiling schema into a Model
const Record = mongoose.model('Record', recordSchema);

// export count
module.exports = Record;