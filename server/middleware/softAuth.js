const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/privateKey');

module.exports = function (req, res, next) {
    const token = req.cookies['x-auth-token'];

    try {
        if(token) {
            const decoded = jwt.verify(token, jwtPrivateKey);
            req.user = decoded;
        }
    } finally {
        next();
    };
    
}