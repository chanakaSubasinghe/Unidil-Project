const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    month: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    numOfFoldBags: {
        type: Number,
        default: 0
    },
    numOfPasteBags: {
        type: Number,
        default: 0
    },
    salary: {
        type: Number,
        default: 0
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
const Salary = mongoose.model('Salary', salarySchema);

// export salary
module.exports = Salary;