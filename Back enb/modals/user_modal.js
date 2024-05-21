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

const SubcribeSchema = new mongoose.Schema({
    email : String,
})

const users = mongoose.model('users', userschema)
const subcribers = mongoose.model('subcribers', SubcribeSchema)

module.exports = {users , subcribers}