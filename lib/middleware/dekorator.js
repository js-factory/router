
/**
 * @description <strong>Orchestrator</strong> controls dekorators execution.
 * <br />
 * It passes initial state to every dekorator which internally filtered by
 * higher level <strong>connect</strong> component and populate only props requested by dekorator.
 *
 * @param {Array} fns collection for dekorator functions
 * @param {object} data initial state
 * @returns {object} final output
 */
const orchestrator = (fns, data) => {
    const modifiers = fns.reduce((acc, fn) => {
        const result = fn(data);
        return {
            ...acc,
            ...result
        };
    }, {});

    return {
        ...data,
        ...modifiers
    };
};


/**
 * @description generates a dekorators middleware
 * @param {array} dekorators collection
 * @returns {function} dekorator middleware
 */
const dekorator = dekorators => (req, res, next) => {
    try {
        const data = res.props('data');
        const reqParams = res.props('reqParams');
        const fns = dekorators || [];

        const finalResponse = orchestrator(fns, { ...data, reqParams });
        res.setProps('data', finalResponse);
    } catch (e) {
        return next(e);
    }
    return next();
};

module.exports = dekorator;
