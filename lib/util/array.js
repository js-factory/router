/**
 * @description checks for an empty array
 * @param {array} target an array
 * @returns {boolean} true|false
 */
const isEmpty = target => Array.isArray(target) && !target.length;

module.exports = {
    isEmpty
};
