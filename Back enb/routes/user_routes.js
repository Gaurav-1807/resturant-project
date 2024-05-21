const {Router} = require('express')
const { signup, login, userdetails, subcriber } = require('../controllers/user_logic')

const router = Router()


router.post("/signup",signup)
router.post("/login", login)
router.get("/userdetails" , userdetails)
router.post("/subcriber", subcriber)
module.exports = router