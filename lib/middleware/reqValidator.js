const reqValidator = require('../util/validator');
const { REQ_INVALID_MESSAGE } = require('../config/constants');

/**
 * @description request validator
 * @param {any} isReqValidator http request object
 * @param {any} res http response object
 * @param {any} next function next
 * @returns {void}
 */
const fn = () => (req, res, next) => {
    const reqParams = res.props('reqParams');
    const isValid = reqValidator(reqParams);

    if (!isValid) {
        return next(new Error(REQ_INVALID_MESSAGE));
    }

    return next();
};

module.exports = fn;
