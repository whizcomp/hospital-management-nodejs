const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true,
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: true
    }

})
userSchema.methods.genAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
    }, config.get('privateKey'));
}
const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(3).max(255).trim().required(),
        lastname: Joi.string().min(3).max(255).trim().required(),
        phone: Joi.string().min(3).max(100).trim().required(),
        password: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required()
    }
    return Joi.validate(user, schema)
}
module.exports.validate = validateUser;
module.exports.User = User;