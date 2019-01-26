/**
 * Router Module
 */
const debug = require('debug')('router');
const initialize = require('./initialize');

module.exports = (routes, options) => {
    const finalRoutes = initialize(routes, options);
    debug(finalRoutes);
    return finalRoutes;
};
