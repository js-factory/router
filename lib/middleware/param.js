const schemaParser = require('../schema');

/**
 * @description an express middleware
 * @param {object} req Incoming Http Request object
 * @param {object} res Outgoing Http Response Message object
 * @param {function} next function to be called
 * @returns {any} releases control to next middleware
 */
const param = () => (req, res, next) => { // Schema validation
    const inputs = schemaParser(req, res);
    res.setProps('reqParams', inputs);
    return next();
};

module.exports = param;
