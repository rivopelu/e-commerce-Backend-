require('dotenv').config
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// REGISTER USER AND ADMIN
exports.RegisterUser = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user)
            return res.status(400).json({
                error: "User already registered",
            });

        const { firstName, lastName, username, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const waktu = new Date().getTime()
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username,
            createdAt: waktu,
            role: 'user'
        });

        _user.save((error, user) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }


            return res.status(201).json({
                message: "registered successfully",
                data: _user
            });

        });
    });
}

// LOGIN ADMIN CONTROLLERS
exports.LoginAdmin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {
                if (user.authenticate(req.body.password)) {

                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY_TOKEN, { expiresIn: '7d' });

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


