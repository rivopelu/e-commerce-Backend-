require('dotenv').config
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { bgRed } = require('colors')
const bcrypt = require('bcrypt')


// REGISTER USER AND ADMIN
exports.RegisterUser = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user)
            return res.status(400).json({
                message: "Admin already registered",
            });

        User.estimatedDocumentCount(async (err, count) => {
            if (err) return res.status(400).json({ error });
            let role = "admin";
            if (count === 0) {
                role = "super-admin";
            }

            const { firstName, lastName, email, username, password } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username,
                role,
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }

                if (data) {
                    return res.status(201).json({
                        message: "Admin created Successfully..!",
                    });
                }
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
                if (user.authenticate(req.body.password) && user.role === 'admin') {

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


