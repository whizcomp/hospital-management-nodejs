const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')
const {
    categorySchema
} = require('./category')
const doctorSchema = new mongoose.Schema({
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

    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
    },
    isDoctor: {
        type: Boolean,
        default: true,

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    category: new mongoose.Schema({
        name: String
    })


})
doctorSchema.methods.genAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        isDoctor: this.isDoctor
    }, config.get('privateKey'));
}
const Doctor = mongoose.model('doctor', doctorSchema);

function validateDoctor(doctor) {
    const schema = {
        firstname: Joi.string().min(3).max(255).trim().required(),
        lastname: Joi.string().min(3).max(255).trim().required(),
        phone: Joi.string().min(3).max(100).trim().required(),
        password: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required(),
        isAdmin: Joi.boolean(),
        isDoctor: Joi.boolean(),
        categoryId: Joi.string().min(24).max(1025).required()
    }
    return Joi.validate(doctor, schema)
}
module.exports.validate = validateDoctor;
module.exports.doctorSchema = doctorSchema;
module.exports.Doctor = Doctor;