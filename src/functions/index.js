// find employee
const findEmployee = async (id) => {
    const Employee = require('../models/employee');

    const employee = await Employee.findOne({ _id: id });

    if (!employee) {
        throw new Error('employee not found!');
    }

    return employee;
};

// find bag
const findBag = async (id, foldCount, pasteCount) => {
    const Bag = require('../models/bag');

    const bag = await Bag.findOne({ _id: id });

    if (!bag) {
        throw new Error('bag not found!');
    }

    const wage = (foldCount * bag.foldPrice) + (pasteCount * bag.pastePrice);

    return {
        bag,
        wage
    };
};

module.exports = {
    findEmployee,
    findBag
};