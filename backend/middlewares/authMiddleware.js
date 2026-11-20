const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.protect =  async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Not authorized, no token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('DECODED USER:', decoded);
        
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({message: 'User no longeer exists'});
        }

        if (!user.isActive) {
            return res.status(403).json({message: 'Account deactivated'});
        }
        req.user = {
            userId: user._id.toString(),
            role: user.role
        }

        next()
        
    } catch (error) {
        res.status(401).json({message: 'Not authorized, token failed', error: error.message});
    }
};