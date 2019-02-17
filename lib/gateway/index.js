const sanitize = require('./sanitize');

// @todo remove easeDispatch and implement native http client
module.exports = async (props) => {
    const { reqConfig, configKeys, handler } = props;
    try {
        const easeResponse = await easeDispatch(configKeys, reqConfig);
        const parsedResponse = sanitize(configKeys, easeResponse);
        const standardResponse = typeof handler === 'function' ? handler(parsedResponse) : parsedResponse;
        return standardResponse;
    } catch (e) {
        throw e;
    }
};
