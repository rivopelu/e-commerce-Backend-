const jwt = require('jsonwebtoken')
exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        req.user = user
        console.log(user)
    } else {

        return res.status(400).json({ message: 'Authorization required' })
    }
    next();


}



// USER MIDDLEWARE
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        res.status(400).json({ message: 'User Access Denied' })
    }
    next();
}



// ADMIN MIDDLEWARE
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(400).json({ message: 'Access Denied' })
    }
    next();
}