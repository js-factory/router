/**
 * @description
 * This function is used to deep freeze an Object so that people can't modify it.
 * @param {object} obj _ Object that needs to be deep freezed.
 * @returns {object} Freezed Object
 */
const deepFreeze = (obj) => {
    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const { [prop]: nestedObj } = obj;
        if (nestedObj !== null && (typeof nestedObj === 'object' || typeof nestedObj === 'function')
            && !Object.isFrozen(nestedObj)) {
            deepFreeze(nestedObj);
        }
    });
    return Object.freeze(obj);
};

module.exports = deepFreeze;
