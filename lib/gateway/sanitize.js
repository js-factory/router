/**
 * sanitize api response
 *
 * @param {array} configKeys response identifier
 * @param {object} response http response
 * @returns {object} parsed response
 */
const sanitize = (configKeys, response) => {
    const isMulti = configKeys.length > 1;

    if (isMulti) {
        const parsedResponse = configKeys.reduce((acc, key) => {
            const { [key]: { statusCode, body } } = response;
            acc[key] = {
                ...body,
                apiStatusCode: statusCode
            };
            return acc;
        }, {});

        return parsedResponse;
    }
    const [singleKeyName] = configKeys;
    const { [singleKeyName]: { statusCode, body } } = response;
    return {
        ...body,
        apiStatusCode: statusCode
    };
};

module.exports = sanitize;
