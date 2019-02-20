
/* eslint no-console: 0, indent: ["error", 4, { "SwitchCase": 1 }], max-len: [2, 150], max-statements: [2, 30], complexity: [0, 10] */

const util = require('./util/validHandlers');
const handlers = require('./middleware');

/**
 * @description configure handlers
 * @param {object} route route definition object
 * @param {object} options user defined options
 * @returns {array} middleware collection
 */
const handler = (route, options = {}) => {
    const {
        schema,
        gateway,
        dekorators,
        prehandlers,
        responseType,
        isReqValidation = false
    } = route;

    if (!util.hasValidHandlerConfig(prehandlers) || !util.hasValidHandlerConfig(dekorators) || !util.isValidGateway(gateway)) { // eslint-disable-line
        console.error(`Route ${route.url} is misconfigured`);
        throw new Error('One of these has a problem pre handler, dekorator, gateway. Please check the route configuration.');
    }

    if (!util.isValidSchema(schema)) {
        console.error(`Route ${route.url} is misconfigured`);
        throw new Error('Request Schema contains custom or locals with no properties. Please check the route configuration.');
    }

    // NOTE: this order is critical to run application as expected.
    // DO NOT CHANGE middleware order
    return [
        'method',
        'param',
        'reqValidator',
        'prehandler',
        'local',
        'gateway',
        'resValidator',
        'dekorator',
        'redirect',
        'viewResolver',
        'filter'
    ].reduce((acc, key) => {
        const { [key]: fn } = handlers;
        switch (key) {
            case 'method': {
                acc.push(fn(route));
                break;
            }
            case 'reqValidator': {
                if (isReqValidation) {
                    acc.push(fn());
                }
                break;
            }
            case 'prehandler': {
                if (util.hasValidHandlerConfig(prehandlers)) {
                    acc.push(fn(prehandlers));
                }
                break;
            }
            case 'local': {
                if (!gateway) {
                    const keyToFetchValFrom = prehandlers ? 'requestConfig' : 'reqParams';
                    acc.push(fn(keyToFetchValFrom));
                }
                break;
            }
            case 'gateway': {
                if (gateway && util.isValidGateway(gateway)) {
                    const { gateway: customGateway } = options;
                    acc.push(fn(gateway, customGateway));
                }
                break;
            }
            case 'dekorator': {
                if (dekorators && util.hasValidHandlerConfig(dekorators)) {
                    acc.push(fn(dekorators));
                }
                break;
            }
            case 'viewResolver': {
                if (responseType === 'html') {
                    acc.push(fn());
                }
                break;
            }
            case 'filter': {
                if (schema && schema.response) {
                    acc.push(fn());
                }
                break;
            }
            default: {
                acc.push(fn());
            }
        }
        return acc;
    }, []);
};

module.exports = handler;
