const { check, validationResult } = require('express-validator')


// VALIDATION REGISTER
exports.validasiRegister = [
    check('firstName').notEmpty().withMessage('firstName is Required'),
    check('lastName').notEmpty().withMessage('lastName is Required'),
    check('email').isEmail().withMessage('please add valid email').notEmpty().withMessage('Required'),
    check('username').notEmpty().withMessage('username required').custom(value => !/\s/.test(value)).withMessage('username tidak bisa menggunakan spasi'),
    check('password').notEmpty().withMessage('password required').isLength({ min: 8 }).withMessage('password minmal 8 karakter')
]

// VALIDATION LOGIN 
exports.validasiLogin = [
    check('email').isEmail().withMessage('please add valid email').notEmpty().withMessage('Required'),
    check('password').notEmpty().withMessage('password required').isLength({ min: 8 }).withMessage('password minmal 8 karakter'),
]


// VALIDATION MESSAGE
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            errors: errors.array()[0].msg
        });
    }
    next()
}