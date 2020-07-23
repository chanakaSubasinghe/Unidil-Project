// requiring dependencies
const mongoose = require('mongoose')

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
    isWork: {
        type: Boolean,
        default: true,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
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
)

// compiling schema into a Model
const Employee = mongoose.model('Employee', employeeSchema);

// export employee
module.exports = Employee;