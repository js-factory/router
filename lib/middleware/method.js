const debug = require('debug')('router');
const _ = require('lodash');
const {
    RESPONSE_CUSTOM_PROP_KEY,
    RESPONSE_CUSTOM_PROP_DATA,
    RESPONSE_CUSTOM_PROP_REQ_PARAMS,
    RESPONSE_CUSTOM_PROP_VIEW_CONFIG,
    RESPONSE_CUSTOM_PROP_REDIRECT,
    RESPONSE_CUSTOM_PROP_REQ_CONFIG
} = require('./config');

module.exports = route => function attachConfig(req, res, next) {
    res[RESPONSE_CUSTOM_PROP_KEY] = {
        [RESPONSE_CUSTOM_PROP_DATA]: {},
        [RESPONSE_CUSTOM_PROP_REQ_PARAMS]: null,
        [RESPONSE_CUSTOM_PROP_REQ_CONFIG]: null,
        [RESPONSE_CUSTOM_PROP_VIEW_CONFIG]: null,
        [RESPONSE_CUSTOM_PROP_REDIRECT]: null
    };
    // add prop getter and setter
    res.props = key => _.get(res[RESPONSE_CUSTOM_PROP_KEY], key);
    res.setProps = (key, value) => {
        res[RESPONSE_CUSTOM_PROP_KEY][key] = value;
    };

    req.routerConfig = route;
    req.localConfig = {};
    req.props = key => _.get(req.localConfig, key);
    req.setProps = (key, value) => {
        req.localConfig[key] = value;
    };
    req.routeExist = true;

    debug(route);
    return next();
};
