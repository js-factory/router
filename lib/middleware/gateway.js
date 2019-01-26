/* eslint max-statements: [2, 40], complexity: [2, 30], no-console: 0 */

const util = require('../util/validHandlers');

/**
 * Validator
 *
 * @param {array} configKeys response identifier
 * @param {object} response http response
 * @returns {object} parsed response
 */
const sanitize = (configKeys, response) => {
    const isMulti = configKeys.length > 1;

    if (isMulti) {
        const parsedResponse = configKeys.reduce((acc, key) => {
            const { [key]: { statusCode, body } } = response;
            acc[key] = {
                ...body,
                apiStatusCode: statusCode
            };
            return acc;
        }, {});

        return parsedResponse;
    }
    const [singleKeyName] = configKeys;
    const { [singleKeyName]: { statusCode, body } } = response;
    return {
        ...body,
        apiStatusCode: statusCode
    };
};

/**
 * @description generates gateway handler middleware
 * @param {function} gateway a gateway method
 * @returns {function} gateway middleware
 */
const fn = (gateway) => {
    if (!util.isValidGateway(gateway)) {
        throw new Error('Not a valid gateway. Please check route definition.');
    }
    return (req, res, next) => {
        const reqConfig = res.props('requestConfig');
        const { configKeys, handler } = gateway(reqConfig);

        return Promise
            .resolve()
            .then(async () => {
                try {
                    const easeResponse = await easeDispatch(configKeys, reqConfig);
                    return sanitize(configKeys, easeResponse);
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            })
            .then((parsedResponse) => {
                const standardResponse = typeof handler === 'function' ? handler(parsedResponse) : parsedResponse;
                res.setProps('data', standardResponse);
                return next();
            }).catch(e => next(e));
    };
};

module.exports = fn;
