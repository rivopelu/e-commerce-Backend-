const User = require('../models/User')

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
                username,
                password,
                username,
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
                        message: ' User Created Success',
                        data

                    })
                }
            })

        })
}


exports.LoginUser = (req, res) => {
    return res.status(200).json({
        message: 'berhasil di login'
    })
}