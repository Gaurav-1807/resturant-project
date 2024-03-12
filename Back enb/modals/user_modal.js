const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: String,
    email: String,
   
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: String
});

const users = mongoose.model('users', userschema)

module.exports = users