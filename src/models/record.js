const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    bag: {
        type: Schema.Types.ObjectId,
        ref: 'Bag',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    numOfFoldBags: {
        type: Number,
        required: true
    },
    numOfPasteBags: {
        type: Number,
        required: true
    },
    wage: {
        type: Number,
        required: true
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


const Record = mongoose.model('Record', recordSchema);

module.exports = Record;