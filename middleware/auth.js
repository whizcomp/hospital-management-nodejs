const jwt = require('jsonwebtoken');
const config = require('config')
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('access denied .token not available');
    try {
        const decode = jwt.verify(token, config.get('privateKey'));
        req.user = decode;
        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }
}