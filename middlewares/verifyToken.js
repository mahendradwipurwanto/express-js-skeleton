const jwt = require('jsonwebtoken');
require('dotenv').config();
const getNamespace = require('cls-hooked').getNamespace;
const userLogin = getNamespace('userLogin');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.failed('Token not provided', 403);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.failed('Failed to authenticate token', 401);
        }
        req.userId = decoded.id;
        userLogin.run(() => {
            userLogin.set('user', decoded);
            next();
        });
    });
};

module.exports = verifyToken;