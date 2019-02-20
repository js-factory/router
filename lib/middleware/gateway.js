/* eslint complexity: [2, 12] */

const util = require('../util/validHandlers');
const defaultGateway = require('../gateway');


/**
 * @description generates gateway handler middleware
 * @param {function} builder method to create config
 * @param {function} gateway a custom gateway for application
 * @returns {function} gateway middleware
 */
const fn = (builder, gateway = defaultGateway) => {
    if (!util.isValidGateway(gateway)) {
        throw new Error('Not a valid gateway. Please check route definition.');
    }
    return (req, res, next) => {
        const reqConfig = res.props('requestConfig');
        const gwConfig = typeof builder === 'function' ? builder(reqConfig) : builder;

        return Promise
            .resolve()
            .then(async () => {
                try {
                    const response = await gateway({ reqConfig, ...gwConfig });
                    res.setProps('data', response);
                    next();
                } catch (e) {
                    throw e;
                }
            }).catch(e => next(e));
    };
};

module.exports = fn;
