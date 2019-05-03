const mongoose = require('mongoose');
const validator = require('validator');

var users = mongoose.model('users',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength : 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    password: {
        required: true,
        type: String,
        minlength : 6
    },
    tokens : [{
        access : {
            type: String,
            required: true
        },
        tokens : {
            type : String,
            required: true
        }
    }]
});

module.exports = {users};