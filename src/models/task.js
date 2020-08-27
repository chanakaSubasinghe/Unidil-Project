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

// before save
taskSchema.pre('save', async function (next) {
    // initializing and destructuring
    const task = this;
    const bag = await Bag.findOne({ _id: task.bag.toString() });
    const record = await Record.findOne({ _id: task.record.toString() });

    const { foldPrice, pastePrice } = bag;
    const { foldCount, pasteCount } = task;

    const totalForFold = foldPrice * foldCount;
    const totalForPaste = pastePrice * pasteCount;

    // calculation
    record.wage += (totalForFold + totalForPaste);
    record.numOfFoldBags += foldCount;
    record.numOfPasteBags += pasteCount;

    // save
    await record.save();

    next();
});


// after delete
taskSchema.pre('findByIdAndDelete', async function (next) {
    // initializing and destructuring
    const task = this;
    const bag = await Bag.findOne({ _id: task.bag.toString() });
    const record = await Record.findOne({ _id: task.record.toString() });

    const { foldPrice, pastePrice } = bag;
    const { foldCount, pasteCount } = task;

    const totalForFold = foldPrice * foldCount;
    const totalForPaste = pastePrice * pasteCount;

    // calculation
    record.wage -= (totalForFold + totalForPaste);
    record.numOfFoldBags -= foldCount;
    record.numOfPasteBags -= pasteCount;

    // save
    await record.save();

    next();
});


// compiling schema into a Model
const Task = mongoose.model('Task', taskSchema);

// export task
module.exports = Task;