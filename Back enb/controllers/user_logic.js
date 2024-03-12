
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const users = require("../modals/user_modal")

const signup = async (req, res) => {
    const { username, role, gender, email, password } = req.body
    let userdata = await users.findOne({ email: email })
    if (userdata) {
        res.send({ "msg": "user already registered" });
        console.log("user already registered");
    }
    else {
        bcrypt.hash(password, 5, async (err, hash) => {

            let obj = { username: username, email: email, password: hash, role: role, gender: gender };
            let val = await users.create(obj)

            res.cookie("id", val._id).send({ msg: "creatred successfully " })
            console.log("user creatred successfully");
        })


    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let data = await users.findOne({ email: email });
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ id: data._id }, "token")
                res.cookie("token", token).cookie("id", data._id).send({ msg: "loggin successful" })
                console.log("loggin successful")
            }
            else {
                res.send("password incorrect")
                console.log("password incorrect")
            }
        })
    }
    else{
        // window.location.reload()
        console.log("user not logged in")
        res.send("user incorrect")
    }
}

module.exports = { signup, login }