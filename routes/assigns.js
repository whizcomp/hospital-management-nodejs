const express = require('express');
const router = express.Router();
const {
    Assign,
    validate
} = require('../models/assign');
const auth = require('../middleware/auth');
const {
    Patient
} = require('../models/patient')
const {
    Doctor
} = require('../models/doctor')

router.get('/', [auth], async (req, res) => {
    const assigns = await Assign.find().sort('-appointDate');
    res.send(assigns);
})
router.post('/', [auth], async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.findById(req.body.patientId);
    if (!patient) return res.status(404).send('patient doesn\'t exist');
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(404).send('doctor doesn\'t exist');
    let assign = new Assign({
        patient: {
            _id: patient._id,
            lastname: patient.lastname
        },
        doctor: {
            _id: doctor._id,
            lastname: doctor.lastname
        }
    })
    await assign.save();
    res.send(assign);
})
router.delete('/:id', [auth], async (req, res) => {
    const assign = await Assign.findByIdAndRemove(req.params.id);
    if (!assign) return res.status(404).send('medical record doesn\'t exist');
    res.send(assign)
})
router.put('/:id', [auth], async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const patient = await Patient.findById(req.body.patientId);
    if (!patient) return res.status(404).send('patient doesn\'t exist');
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(404).send('doctor doesn\'t exist');
    const assign = await Assign.findByIdAndUpdate(req.params.id, {
        patient: {
            _id: patient._id,
            lastname: patient.lastname
        },
        doctor: {
            _id: doctor._id,
            lastname: patient.lastname
        }
    }, {
        new: true
    })
    if (!assign) return res.status(404).send('medical record doesn\'t exist');
    res.send(assign)
})
module.exports = router;