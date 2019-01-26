const _ = require('lodash');

const connector = (configKeys, handler) => {
    if (handler && !_.isFunction(handler)) {
        throw new Error('Gateway handler must be a function');
    }

    if (!Array.isArray(configKeys)) {
        throw new Error('Ease config must be a collection of object or function or both');
    }

    return () => ({
        configKeys,
        handler
    });
};

module.exports = connector;
