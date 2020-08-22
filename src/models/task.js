// requiring dependencies
const mongoose = require('mongoose')

// define schema
const Schema = mongoose.Schema;

// creating new schema
const taskSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        trim: true,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    counts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Count'
        }
    ]
},
    {
        timestamps: true
    }
)

// compiling schema into a Model
const Task = mongoose.model('Task', taskSchema);

// export task
module.exports = Task;