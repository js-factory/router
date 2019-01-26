/**
 * @description an express middleware to handle requests do not need
 * remote service interactions
 * @param {string} keyToFetchValueFrom key to fetch value from
 * @returns {any} return http response
 */
const local = keyToFetchValueFrom => (req, res, next) => {
    const localResponse = res.props(keyToFetchValueFrom);
    res.setProps('data', localResponse);
    return next();
};

module.exports = local;
