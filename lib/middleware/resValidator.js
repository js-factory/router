const _ = require('lodash');
const { RES_INVALID_MESSAGE } = require('../config/constants');

/**
 * @description request validator
 * @param {any} isReqValidator http request object
 * @param {any} res http response object
 * @param {any} next function next
 * @returns {void}
 */
const fn = () => (req, res, next) => {
    const data = res.props('data');
    const statusCode = _.get(data, 'error.statusCode', 200);
    const isValid = statusCode === 200;

    if (!isValid) {
        return next(new Error(RES_INVALID_MESSAGE));
    }

    return next();
};

module.exports = fn;
