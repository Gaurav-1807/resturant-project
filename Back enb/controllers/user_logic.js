
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const {users , subcribers} = require("../modals/user_modal")

const signup = async (req, res) => {
    const { username, role, gender, email, password } = req.body
    let userdata = await users.findOne({ email: email })
    if (userdata) {
        console.log("user already registered");
        return res.status(409).json({ message: 'Email is already registered' });
        
    }
    else {
        bcrypt.hash(password, 5, async (err, hash) => {

            let obj = { username: username, email: email, password: hash, role: role, gender: gender };
            let val = await users.create(obj)

            res.send(val )
            console.log("user creatred successfully", val);
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
                res.setHeader('X-Custom-Header', 'data.id').send({token})
                console.log("loggin successful")
                // console.log(data)
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

const userdetails = async (req, res) => {
    // const { id } = req.cookies;
    console.log(req.headers)
    console.log(req.cookies)
    try {
        let data = await users.findById(req.cookies.id); // Use id instead of req.cookies.id
        res.send({data});
        console.log(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user details');
    }
};
const subcriber = async (req, res) => {
    const { email} = req.body ;
    const data = await subcribers.findOne({email: email})
    if(data){
        return res.status(409).json({ message: 'Email is already registered' });
    }
   else{
    if(!email) {
        res.send("Please enter a valid email")
    }
    else{
        const data = await subcribers.create(req.body)
        res.send(data);
    }
   }
}

module.exports = { signup, login , userdetails , subcriber}