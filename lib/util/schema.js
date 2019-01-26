/**
 * @description checks for valid Object Schema
 * @param {any} schema Object schema to be validated
 * @returns {boolean} true | false
 */
const isValidObjSchema = (schema) => {
    const { properties } = (schema || {});
    return properties && Object.keys(properties).length >= 1;
};

module.exports = {
    isValidObjSchema
};
