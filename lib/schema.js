
const { parserAjv } = require('./request/parser');


/**
 * Schema parser
 * @description Schema parser validates and filters request schema
 * @param {object} req Incoming Http Request Object
 * @param {object} res Outgoing Http Response Object
 * @returns {object} filtered configuration object
 */
module.exports = (req, res) => {
    const { routerConfig: { schema } } = req;
    const { locals = {} } = res;
    // provide support for go without schema definition
    if (!schema) {
        return {};
    }

    const keys = Object.keys(schema);
    const exceptionRegex = /response/i;
    const variations = /config/;
    const config = req.getConfig();

    const requestSchema = keys.reduce((acc, key) => {
        if (!exceptionRegex.test(key)) {
            switch (true) {
            case !!variations.test(key):
                acc[key] = parserAjv(config, schema[key], false);
                break;
            case key === 'custom': // custom configurations
                acc[key] = parserAjv(req, schema[key]);
                break;
            case key === 'locals':
                acc[key] = parserAjv(locals, schema[key]);
                break;
            default: {
                acc[key] = parserAjv(req[key], schema[key]);
            }
            }
        }
        return acc;
    }, {});

    return requestSchema;
};
