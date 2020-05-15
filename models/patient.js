const mongoose = require('mongoose');
const Joi = require('joi');

const patientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    lastname: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true
    },
    inpatient: {
        type: Boolean,
        default: false,
        required: false
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,

    },
    category: new mongoose.Schema({
        name: String
    })

})

const Patient = mongoose.model('patient', patientSchema);

function validatePatient(patient) {
    const schema = {
        firstname: Joi.string().min(3).max(255).trim().required(),
        lastname: Joi.string().min(3).max(255).trim().required(),
        phone: Joi.string().min(3).max(100).trim().required(),
        categoryId: Joi.string().min(6).max(255).required(),

        email: Joi.string().email().required()
    }
    return Joi.validate(patient, schema)
}
module.exports.validate = validatePatient;
module.exports.Patient = Patient;