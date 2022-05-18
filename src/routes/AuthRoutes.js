const express = require('express');
const User = require('../models/User')
const { RegisterUser, LoginAdmin } = require('../controllers/AuthController')
const router = express.Router()



// LOGIN ROUTES
router.post('/login', LoginAdmin)


// REGISTER ROUTES
router.post('/register', RegisterUser)


// PROFILE ROUTES
router.post('/profile', (req, res) => {
    res.status(200).json({
        message: 'hello'
    })
})

module.exports = router