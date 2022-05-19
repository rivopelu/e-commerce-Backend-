const express = require('express');

const { RegisterUser, LoginAdmin, } = require('../controllers/admin/AuthController');
const { validasiRegister, isRequestValidated, validasiLogin } = require('../validator/authValidator');
const router = express.Router()



// LOGIN ROUTES
router.post('/admin/login', validasiLogin, isRequestValidated, LoginAdmin)


// REGISTER ROUTES
router.post('/admin/register', validasiRegister, isRequestValidated, RegisterUser)




module.exports = router