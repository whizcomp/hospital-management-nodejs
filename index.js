const express = require('express');
const app = express();
const winston = require('winston')

require('./startups/configs')
require('./startups/app')(app);
require('./startups/db')();
const port = process.env.PORT || 4700;
app.listen(port, () => winston.info(`listening on  port ${port}`))