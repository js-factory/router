const { parserAjv } = require('../request/parser');
const addResProps = require('./addResProps');

/**
 * @description <strong>Response Schema Parser</strong>. It validates response against given
 * schema and returns the validated and filtered response.
 * @param {any} schema response schema
 * @param {any} data final response
 * @param {any} res HttpResponse
 * @returns {object} an valid response
 */
const responseSchema = (schema, data, res) => {
    const response = parserAjv(data, schema);
    addResProps(schema, res, data);
    return response;
};

module.exports = responseSchema;
