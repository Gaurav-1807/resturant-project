

const express = require('express');
const connect = require('./config/db');
const cookie = require("cookie-parser");
const cors = require('cors');
const router = require('./routes/user_routes');


const app = express();
app.use(express.json())
app.use(cors())
app.use(cookie())
app.use(express.urlencoded({ extended: true }))
app.use("/user",router)
app.listen(8090 ,()=>{
    connect()
    console.log('connecting to server ...');
})
