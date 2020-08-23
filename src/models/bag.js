// requiring dependencies
const mongoose = require('mongoose');

// define schema
const Schema = mongoose.Schema;


// creating new schema
const bagSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true
    },
    width: {
        type: Number,
        trim: true,
        required: true
    },
    height: {
        type: Number,
        trim: true,
        required: true
    },
    foldPrice: {
        type: Number,
        required: true
    },
    pastePrice: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    },
);

// compiling schema into a Model
const Bag = mongoose.model('Bag', bagSchema);

// export bag
module.exports = Bag;