const R = require('ramda');

/**
 * @description generates a pre handler middleware
 * @param {array} handlers collection of pre handler functions
 * @returns {any} passes control to next middleware in chain
 */
const preHandler = handlers => (req, res, next) => {
    const reqParams = res.props('reqParams');

    if (!handlers) {
        res.setProps('requestConfig', reqParams);
        return next();
    }

    try {
        const fns = handlers || [];
        const requestConfig = fns ? R.pipe(...fns)(reqParams) : reqParams;
        const { redirect } = requestConfig;

        if (redirect) {
            const { code = 302, path = 'back' } = redirect;
            return res.redirect(code, path);
        }

        res.setProps('requestConfig', requestConfig);
        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = preHandler;
