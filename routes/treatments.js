const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const doc = require('../middleware/authIsDoc')

const {
    Assign
} = require('../models/assign')
const {
    validate,
    Treat
} = require('../models/treatment')
router.get('/', [auth], async (req, res) => {
    const treatments = await Treat.find().sort('-dateOfTreat');
    res.send(treatments);

})
router.post('/', [auth, doc], async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let assign = await Assign.findById(req.body.assignId);
    if (!assign) return res.status(404).send('doctor or patient not assigned');

    treat = await Treat({
        assign: {
            patient: {
                _id: assign.patient._id,
                lastname: assign.patient.lastname,
                inpatient: req.body.inpatient
            },
            doctor: {
                _id: assign.doctor._id,
                lastname: assign.doctor.lastname
            }
        },
        treatTitle: req.body.treatTitle,
        treatBody: req.body.treatBody,
        drugDescribe: req.body.drugDescribe
    })
    await treat.save();
    await assign.remove({
        _id: assign._id
    });
    res.send(treat);
})
module.exports = router;