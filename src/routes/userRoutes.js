const express = require('express');
const User = require('../models/User')
const { RegisterUser, LoginUser } = require('../controllers/UserController')
const router = express.Router()



// LOGIN ROUTES
router.post('/login', LoginUser)


// REGISTER ROUTES
router.post('/register', RegisterUser)


module.exports = router