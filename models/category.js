const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
        trim: true
    },
    noOfRooms: {
        type: Number,
        min: 1,
        max: 1000,
        required: true
    }
})
const Category = mongoose.model('category', categorySchema);

function categoryValidate(category) {
    const schema = {
        name: Joi.string().min(2).max(2555).trim().required(),
        noOfRooms: Joi.number().min(1).max(1000).required()
    }
    return Joi.validate(category, schema)
}
module.exports.categoryValidate = categoryValidate;
module.exports.Category = Category;
module.exports.categorySchema = categorySchema;