const CONSTANT = require('../config/constants');

/**
 * @description a middleware to resolve view for current request
 * @param {any} req Incoming request
 * @param {any} res Outgoing response message
 * @param {any} next function
 * @returns {function} express middleware
 */
const viewResolver = () => (req, res, next) => {
    const { routerConfig: { responseType, template = '', domain = 'home' } } = req;
    const templateType = typeof template;
    let templateName;

    if (responseType === CONSTANT.RESPONSE_TYPE_HTML && templateType === 'function') {
        templateName = template();
    } else if (templateType === 'string') {
        templateName = template;
    }

    if (typeof templateName !== 'string') {
        throw new Error('Template name must be a string');
    }

    res.setProps('viewConfig', {
        flow: domain,
        view: templateName
    });

    return next();
};

module.exports = viewResolver;
