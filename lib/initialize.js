
const middleware = require('./handler');

/**
 * @description attaches middleware with routes
 * @param {object} routes user defined custom routes
 * @param {object} options user defined middleware
 * @returns {object} modified routes
 */
const initialize = (routes, options) => routes.reduce((acc, route) => {
    const {
        url,
        method = 'GET'
    } = route;

    const key = `${method} ${url}`;

    acc[key] = middleware(route, options);

    return acc;
}, {});

module.exports = initialize;
