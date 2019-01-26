/**
 * @description redirects to given url or referrer else release control to next
 * @param {object} req Incoming Http Request object
 * @param {object} res Outgoing Http Response Message object
 * @param {function} next function to be called
 * @returns {any} releases control to next middleware
 */
const redirectTo = () => (req, res, next) => { // http redirect
    // Check if http redirect is set
    const { redirect, cookies = [] } = res.props('data') || {};
    if (redirect) {
        const { code = 302, path = 'back' } = redirect;
        if (cookies.length) {
            for (let i = 0; i < cookies.length; i += 1) {
                const { name, value, options = {} } = cookies[i]; // eslint-disable-line
                res.cookie(name, value, options);
            }
        }

        return res.redirect(code, path);
    }

    return next();
};

module.exports = redirectTo;
