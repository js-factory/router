const _ = require('lodash');
/* eslint-disable yoda */
/**
 * @description add given objects to source as props
 * @param {object} values an object
 * @param {string} type type of object
 * @param {object} res source object
 * @param {object} data response data
 * @returns {void} returns nothing
 */
const setValues = (values, type, res, data) => { //eslint-disable-line
    if ('function' === typeof values) {
        values = values(data); //eslint-disable-line
    }
    _.forEach(values, (item) => {
        const { name, value, options = {} } = item;
        if ('cookies' === type) {
            return res.cookie(name, value, options);
        }

        if ('headers' === type) {
            return res.setHeader(name, value);
        }

        if ('session' === type) {
            res.session[name] = value;
        }
        return res;
    });
};
/**
 * @description adds props to http response
 * @param {any} schema a valid json schema
 * @param {any} res http response object
 * @param {any} data final response
 * @returns {void}
 */
const addResProps = (schema, res, data) => {
    const { cookies, headers, session } = schema;
    if (cookies) {
        setValues(cookies, 'cookies', res, data);
    }
    if (headers) {
        setValues(headers, 'headers', res, data);
    }
    if (session) {
        setValues(session, 'session', res, data);
    }
};

module.exports = addResProps;
