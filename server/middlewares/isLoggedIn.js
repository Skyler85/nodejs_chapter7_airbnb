const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.isLoggedIn = async (req, res, next) => {

    const token = req.cookies.token || req.header('Authorization').replace('Bearer ','');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Login first to do this',
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}