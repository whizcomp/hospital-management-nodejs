const mongoose = require('mongoose');
const Joi = require('joi');

const treatSchema = new mongoose.Schema({
    assign: new mongoose.Schema({
        patient: {
            lastname: String
        },
        doctor: {
            lastname: String
        }
    }),
    treatTitle: {
        type: String,
        min: 2,
        max: 1024,
        required: true
    },
    treatBody: {
        type: String,
        min: 2,
        max: 1024,
        required: true
    },

    drugDescribe: {
        type: String,
        min: 2,
        max: 1024,
        required: true
    },
    dateOfTreat: {
        type: Date,
        default: Date.now

    }
})
const Treat = mongoose.model('treat', treatSchema);

function treatValidate(treat) {
    const schema = {
        assignId: Joi.string().min(3).max(255).required(),
        treatTitle: Joi.string().min(3).max(255).trim().required(),
        treatBody: Joi.string().min(3).max(255).trim().required(),
        drugDescribe: Joi.string().min(3).max(255).trim().required(),
        inpatient: Joi.boolean().required()
    }
    return Joi.validate(treat, schema)
}
module.exports.Treat = Treat;
module.exports.validate = treatValidate;