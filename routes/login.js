const Joi = require('joi');
const express = require('express');
const {
    User
} = require('../models/user')
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash')
router.post('/', async (req, res) => {
    const {
        error
    } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('invalid email or password');
    validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send('invalid password or email');
    const token = user.genAuthToken();
    res.send(_.pick(user, ['firstname', 'lastname', 'email', 'phone']));
})

function validateLogin(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(req, schema)
}
module.exports = router;