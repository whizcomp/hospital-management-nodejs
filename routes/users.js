const express = require('express');
const router = express.Router();
// require('express-async-errors');
const auth = require('../middleware/auth')

const bcrypt = require('bcrypt')
const _ = require('lodash')
const {
    validate,
    User
} = require('../models/user')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})
router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('user already exist');

    user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'phone']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.genAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstname', 'lastname', 'email', 'phone', 'isAdmin']))
})
module.exports = router;