const param = require('./param');
const local = require('./local');
const method = require('./method');
const filter = require('./filter');
const gateway = require('./gateway');
const redirect = require('./redirect');
const dekorator = require('./dekorator');
const prehandler = require('./prehandler');
const viewResolver = require('./viewResolver');
const reqValidator = require('./reqValidator');
const resValidator = require('./resValidator');


module.exports = {
    local,
    param,
    filter,
    method,
    gateway,
    redirect,
    dekorator,
    prehandler,
    reqValidator,
    resValidator,
    viewResolver
};
