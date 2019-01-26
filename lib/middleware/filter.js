const responseSchema = require('../response/responseSchema');

/**
 * @description an express middleware
 * @param {object} req Incoming Http Request object
 * @param {object} res Outgoing Http Response Message object
 * @param {function} next function to be called
 * @returns {any} releases control to next middleware
 */
const param = () => (req, res, next) => {
    const { routerConfig: { schema: { response: { ok } } } } = req;
    const data = res.props('data');
    const result = responseSchema(ok, data, res);
    res.setProps('data', result);
    return next();
};

module.exports = param;
