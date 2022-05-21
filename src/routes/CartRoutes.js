const express = require('express');
const { addItemToCart } = require('../controllers/CartController')
const { requireSignin, userMiddleware } = require('../common/common')
const router = express.Router()


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)



module.exports = router;