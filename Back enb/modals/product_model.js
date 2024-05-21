const mongoose = require('mongoose');

const product = new mongoose.Schema({
    image : String,
    name : String,
    chef : String,
    madedate : Date,
    rating : Number,
    category : String,
})