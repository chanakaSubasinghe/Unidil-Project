// requiring dependencies
const mongoose = require('mongoose');
const validator = require('validator')

// define schema
const Schema = mongoose.Schema;

// creating new schema
const userSchema = new Schema({
    fullName: {
        type: String,
        lowercase: true,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!!!')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`password cannot contain "password"`);
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
        },
    ],
},
    {
        timestamps: true
    })

// compiling schema into a Model
const User = mongoose.model('User', userSchema);

// export user
module.exports = User;
