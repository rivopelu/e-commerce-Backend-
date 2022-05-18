const express = require('express');

const { RegisterUser, LoginAdmin, } = require('../controllers/admin/AuthController')
const router = express.Router()



// LOGIN ROUTES
router.post('/admin/login', LoginAdmin)


// REGISTER ROUTES
router.post('/admin/register', RegisterUser)




module.exports = router