const Ajv = require('ajv');
const filter = require('./filter');

const options = {
    removeAdditional: 'all',
    coerceTypes: true
};
/**
 * @description general json schema parser
 * @param {any} source source to be validated
 * @param {any} schema schema against given source to be validated
 * @param {any} key response prop name
 * @returns {object} result
 */
function parser(source, schema, key) {
    const fn = filter(schema);
    const filteredProps = fn(source);

    return { [key]: filteredProps };
}
/**
 * @description AJV json parser
 * @param {any} source source to be validated
 * @param {any} schema schema against given source to be validated
 * @param {boolean} addPropsOnFail add props in the result even if validation fails if set to true
 * @returns {object} result
 */
const parserAjv = (source, schema, addPropsOnFail = true) => {
    const ajv = new Ajv(options);
    const newSchema = { ...schema };
    const validate = ajv.compile(newSchema);
    const newSource = { ...source };
    const isValid = validate(newSource);
    const result = !isValid && !addPropsOnFail ? {} : newSource;

    return {
        isValid,
        ...result
    };
};


module.exports.parser = parser;
module.exports.parserAjv = parserAjv;

module.export = {
    parser,
    parserAjv
};
