// requiring dependencies
const mongoose = require('mongoose');
const Bag = require('./bag');
const Record = require('./record');

// define schema
const Schema = mongoose.Schema;

// creating new schema
const taskSchema = new Schema({
    bag: {
        type: Schema.Types.ObjectId,
        ref: 'Bag',
        required: true
    },
    pasteCount: {
        type: Number,
        default: 0
    },
    foldCount: {
        type: Number,
        default: 0
    },
    record: {
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: true
    },
},
    {
        timestamps: true
    }
);

// compiling schema into a Model
const Task = mongoose.model('Task', taskSchema);

// export task
module.exports = Task;