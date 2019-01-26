const router = require('./lib/router');
const transformer = require('./lib/response/responseSchema');

module.exports = {
    router,
    transformer
};

exports.router = router;
exports.transformer = transformer;
