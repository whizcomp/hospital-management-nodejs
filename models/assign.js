const mongoose = require('mongoose');
const Joi = require('joi');

const assignSchema = new mongoose.Schema({
    patient: new mongoose.Schema({
        lastname: {
            type: String,
            required: true
        }
    }),
    doctor: new mongoose.Schema({
        lastname: {
            type: String,
            required: true
        }
    }),
    appointDate: {
        type: Date,
        default: Date.now
    }
})
const Assign = mongoose.model('assign', assignSchema);

function validateAssignment(assign) {
    const schema = {
        patientId: Joi.string().min(6).max(255).required(),
        doctorId: Joi.string().min(6).max(255).required()
    }
    return Joi.validate(assign, schema)
}
module.exports.Assign = Assign;
module.exports.validate = validateAssignment;