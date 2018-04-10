const mongoose = require('mongoose');

var users = mongoose.model('users',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength : 1
    }
});

module.exports = {users};