const express = require('express');
const User = require('../models/User')

const router = express.Router()

router.get('/login', (req, res) => {

})


router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'user already registered'
            });
            const unixTime = new Date().getTime();
            const { firstName, lastName, email, password } = req.body
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                createdAt: unixTime
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went Wrong'
                    })
                }

                if (data) {
                    return res.status(201).json({
                        status: true,
                        message: 'Success',
                        data

                    })
                }
            })

        })
})


module.exports = router