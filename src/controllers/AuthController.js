require('dotenv').config
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { bgRed } = require('colors')


// REGISTER USER AND ADMIN
exports.RegisterUser = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'user already registered'
            });
            const unixTime = new Date().getTime();
            const {
                firstName,
                lastName,
                username,
                email,
                password
            } = req.body
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password: password,
                username,
                role: 'user',
                createdAt: unixTime
            });

            _user.save((error, data) => {
                console.log(bgRed(error))
                if (error) {
                    return res.status(400).json({
                        message: 'Something went Wrong'
                    })
                }

                if (data) {
                    return res.status(201).json({
                        status: true,
                        message: ' User Created Success',
                        data

                    })
                }
            })

        })
}

// LOGIN ADMIN CONTROLLERS
exports.LoginAdmin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {
                if (user.authenticate(req.body.password)) {

                    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY_TOKEN, { expiresIn: '7d' });

                    const { _id, firstName, lastName, email, role, fullName } = user;

                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    });

                } else {
                    return res.status(400).json({
                        status: false,
                        message: 'Login Failed'
                    })
                }
            } else {
                return res.status(400).json({ message: 'Something went Wrong' })
            }
        })
}


exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    req.user = user
    console.log(bgRed(user))
    next()
}