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
        unique: true
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
    records: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Record'
        }
    ],
    salaries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Salary'
        }
    ],
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'Supervisor',
        required: true
    },
},
    {
        timestamps: true
    }
);


employeeSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('full name and contact number must be unique'));
    } else {
        next(error);
    }
});


// compiling schema into a Model
const Employee = mongoose.model('Employee', employeeSchema);

// export employee
module.exports = Employee;