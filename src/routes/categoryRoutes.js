const express = require('express');
const { requireSignin, adminMiddleware } = require('../common/common')
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/categoryController')

router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/get', getCategories);

module.exports = router;