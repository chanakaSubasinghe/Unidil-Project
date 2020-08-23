// requiring dependencies
const mongoose = require('mongoose');

// define schema
const Schema = mongoose.Schema;

// creating new schema
const employeeSchema = new Schema({
    fullName: {
        type: String,
        lowercase: true,
        maxlength: 20,
        unique: true,
        required: true
    },
    contactNumber: {
        type: String,
        trim: true,
        maxlength: 10,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'Supervisor',
        required: true
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    salaries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Salary'
        }
    ]
},
    {
        timestamps: true
    }
);

// compiling schema into a Model
const Employee = mongoose.model('Employee', employeeSchema);

// export employee
module.exports = Employee;