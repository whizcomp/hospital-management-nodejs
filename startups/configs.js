const config = require('config')
const winston =require('winston')
module.exports = function () {
    if (!config.get('privateKey')) {
        winston.error('FATAL ERROR PRIVATE KEY NOT DEFINED')
        process.exit(1)
    }
}