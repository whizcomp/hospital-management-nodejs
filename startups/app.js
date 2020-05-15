const express = require('express');
const error = require('../middleware/error');
const user = require('../routes/users');
const login = require('../routes/login');
const categories = require('../routes/categories');
const doctors = require('../routes/doctors');
const patients = require('../routes/patients');
const assigns = require('../routes/assigns');
const treatments = require('../routes/treatments');
const doclogin = require('../routes/docLogin.js');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/login', login);
    app.use('/api/doctors', doctors)
    app.use('/api/categories', categories)
    app.use('/api/patients', patients)
    app.use('/api/assigns', assigns);
    app.use('/api/treatments', treatments)
    app.use('/api/doclogin', doclogin);

    app.use(error)
};