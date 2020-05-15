const express = require('express');
const router = express.Router();
const Joi = require('joi')
const bcrypt = require('bcrypt')
const {
    Doctor
} = require('../models/doctor');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let doctor = await Doctor.findOne({
        email: req.body.email
    });
    if (!doctor) return res.status(400).send('invalid email or password');
    validatePassword = await bcrypt.compare(req.body.password, doctor.password);
    if (!validatePassword) return res.status(400).send('invalid email or password');
    const token = doctor.genAuthToken();
    res.send(`${doctor} \n ${token}`);
})

function validate(doc) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(doc, schema)
}
module.exports = router;