const express = require('express');
const router = express.Router();
const {
    validate,
    Patient
} = require('../models/patient');
const auth = require('../middleware/auth')
const {
    Category
} = require('../models/category')

router.get('/', auth, async (req, res) => {
    const patient = await Patient.find();
    res.send(patient)
})
router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let email = await Patient.findOne({
        email: req.body.email
    });
    if (email) return res.status(400).send('user already exist')


    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send('no category found');
    let patient = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        category: {
            _id: category._id,
            name: category.name
        }

    })
    await patient.save();
    res.send(patient);
})
module.exports = router;