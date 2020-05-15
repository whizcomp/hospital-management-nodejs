module.exports = function (req, res, next) {
    if (!req.user.isDoctor) return res.status(403).send('access denied user isn\'t a doctor');
    next();
}