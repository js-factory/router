/**
 * @description iterates over input & validates it.
 * <br />
 * Note: All the properties in the input should have isValid key otherwise
 * it will be considered as valid input.
 *
 * @example
 * Sample input <br />
 *     const args = {
 *          query: {
 *              isValid: false
 *          },
 *          params: {
 *              isValid: true,
 *              productId: 123
 *          }
 *      };
 *  // output false
 *
 * @param {object} [args={}] Input to be validated
 * @returns {boolean} isValidSchema true|false
 */
const validator = (args = {}) => {
    const keys = Object.keys(args);
    const isValidSchema = keys.reduce((acc, key) => {
        const { [key]: prop } = args;
        const { isValid = true } = prop;
        return acc && isValid;
    }, true);
    return isValidSchema;
};

module.exports = validator;
