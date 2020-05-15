const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/authIsAdmin');

// require('express-async-errors');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {
    validate,
    Doctor
} = require('../models/doctor')
const {
    Category
} = require('../models/category')
router.get('/', auth, async (req, res) => {
    const doctors = await Doctor.find().sort('firstname').select('-password');
    res.send(doctors);
})
router.post('/', [auth, admin], async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let doctor = await Doctor.findOne({
        email: req.body.email
    })
    if (doctor) return res.status(400).send('user already exist');
    const category = await Category.findById(req.body.categoryId)
    if (!category) return res.status(404).send('category is invalid')
    doctor = new Doctor({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        category: {
            _id: category._id,
            name: category.name
        }
    });

    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(doctor.password, salt);
    await doctor.save();
    const token = doctor.genAuthToken();
    res.header('x-auth-token', token).send(_.pick(doctor, ['_id', 'firstname', 'lastname', 'email', 'phone', 'category']))
})
router.delete('/:id', [auth, admin], async (req, res) => {

    const doctor = await Doctor.findOneAndRemove(req.params.id);
    if (!doctor) return res.send('doctor does not exist');
    res.send(`deleted ${doctor}`);
})
module.exports = router;