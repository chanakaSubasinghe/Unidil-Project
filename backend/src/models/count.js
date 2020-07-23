// requiring dependencies
const mongoose = require('mongoose');

// define schema
const Schema = mongoose.Schema;

// creating new schema
const countSchema = new Schema({
    foldCount: {
        type: Number,
        default: 0
    },
    pasteCount: {
        type: Number,
        default: 0
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    bag: {
        type: Schema.Types.ObjectId,
        ref: 'Bag'
    }
},
    {
        timestamps: true
    }
)

// compiling schema into a Model
const Count = mongoose.model('Count', countSchema);

// export count
module.exports = Count;