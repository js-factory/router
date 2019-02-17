const _ = require('lodash');
const responseSchema = require('../response/responseSchema');

/**
 * @description an express middleware
 * @param {object} req Incoming Http Request object
 * @param {object} res Outgoing Http Response Message object
 * @param {function} next function to be called
 * @returns {any} releases control to next middleware
 */
const param = () => (req, res, next) => {
    const ok = _.get(req, 'routerConfig.schema.response.ok');
    if (ok) {
        const data = res.props('data');
        const result = responseSchema(ok, data, res);
        res.setProps('data', result);
    }

    return next();
};

module.exports = param;
