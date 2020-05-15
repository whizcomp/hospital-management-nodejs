const express = require('express');
const _ = require('lodash')
const auth = require('../middleware/auth')
const router = express.Router();
const {
    Category,
    categoryValidate
} = require('../models/category')

router.get('/', async (req, res) => {
    const categories = await Category.find().sort('noOfRooms');
    res.send(categories)
})
router.post('/', auth, async (req, res) => {
    const {
        error
    } = categoryValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = new Category(_.pick(req.body, ['name', 'noOfRooms']));
    await category.save();
    res.send(category);
})
router.put('/:id', auth, async (req, res) => {
    const {
        error
    } = categoryValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findOneAndUpdate(req.params.id, _.pick(req.body, ['name', 'noOfRooms']), {
        new: true
    })
    if (!category) return res.status(404).send('category not found');
    res.send(category);
})
router.delete('/:id', auth, async (req, res) => {
    const category = await Category.findOneAndRemove(req.params.id);
    if (!category) return res.status(404).send('category doesn\'t exist');
    res.send(category)
})
module.exports = router;