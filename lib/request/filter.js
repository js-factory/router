const R = require('ramda');
/**
 * @description filters given props from source object
 * @param {any} schema valid schema
 * @returns {object} output
 */
const fn = schema => R.compose(
    values => schema.reduce((acc, key, index) => {
        const { [index]: currentVal } = values;
        acc[key] = currentVal;
        return acc;
    }, {}),
    R.compose(R.props(schema))
);


module.exports = fn;
