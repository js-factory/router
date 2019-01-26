
const arrayUtil = require('./array');
const schemaUtil = require('./schema');
const { SCHEMA_KEYS_TO_VALIDATE } = require('../config/constants');

const { isArray } = Array;

/**
 * @description checks for valid handlers
 * @param {any} target target to be validated
 * @returns {boolean} true | false
 */
const isValidHandler = (target) => {
    const result = typeof target === 'undefined' || !arrayUtil.isEmpty(target);
    return result;
};

/**
 * @description checks for valid handlers
 * @param {any} target target to be validated
 * @returns {boolean} true | false
 */
const hasValidHandlerConfig = (target) => {
    const targetType = typeof target;
    const isArrayConfig = isArray(target);
    let result = false;

    if (targetType === 'object' && !isArrayConfig) {
        const keys = Object.keys(target);
        result = !!keys;
    } else if (targetType === 'undefined' || !arrayUtil.isEmpty(target)) {
        result = true;
    }
    return result;
};

/**
 * @description checks for valid handlers
 * @param {any} target target to be validated
 * @returns {boolean} true | false
 */
const isValidGateway = (target) => {
    const targetType = typeof target;
    const result = /(undefined|function)/.test(targetType);
    return result;
};

/**
 * @description checks for valid schema
 * @param {any} schema schema to be validated
 * @returns {boolean} true | false
 */
const isValidSchema = (schema) => {
    if (!schema) {
        return true;
    }

    for (let i = 0; i < SCHEMA_KEYS_TO_VALIDATE.length; i += 1) {
        const { [SCHEMA_KEYS_TO_VALIDATE[i]]: target } = schema;
        if (target && !schemaUtil.isValidObjSchema(target)) {
            return false;
        }
    }

    return true;
};

module.exports = {
    isValidHandler,
    isValidGateway,
    isValidSchema,
    hasValidHandlerConfig
};
