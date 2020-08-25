// requiring dependencies
const mongoose = require('mongoose');

// define schema
const Schema = mongoose.Schema;

// creating new schema
const taskSchema = new Schema({
    pasteCount: {
        type: Number
    },
    foldCount: {
        type: Number,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    bag: {
        type: Schema.Types.ObjectId,
        ref: 'Bag'
    }
},
    {
        timestamps: true
    }
);

// compiling schema into a Model
const Task = mongoose.model('Task', taskSchema);

// export task
module.exports = Task;