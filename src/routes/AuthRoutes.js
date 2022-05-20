const express = require('express');
const User = require('../models/User')
const { RegisterUser, LoginAdmin } = require('../controllers/AuthController')
const router = express.Router()
const { validasiRegister, isRequestValidated, validasiLogin } = require('../validator/authValidator')


// LOGIN ROUTES
router.post('/login', validasiLogin, isRequestValidated, LoginAdmin)


// REGISTER ROUTES
router.post('/register', validasiRegister, isRequestValidated, RegisterUser)


// PROFILE ROUTES
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ message: "hello" })
// })

module.exports = router