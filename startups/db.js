const mongoose = require('mongoose');
const winston=require('winston')
module.exports = function () {
    mongoose.connect('mongodb://localhost/clare', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => winston.info('connected to mongodb'))
        .catch(() => winston.error('failed to connect to mongodb'))
        mongoose.set('useCreateIndex',true)
}