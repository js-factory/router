/**
 * @description
 * This function is used to deduce the isEnvironment.
 * @param {*} env - isEnvironment String
 * @returns {boolean} Returns true|false
 */
const isEnvironmentDev = () => (!process.env.NODE_ENV || (process.env.NODE_ENV === 'development'));

module.exports = {
    isEnvironmentDev
};
