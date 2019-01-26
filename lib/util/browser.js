const isChrome = name => /Chrome/i.test(name);
const isFirefox = name => /firefox/i.test(name);

module.exports = {
    isChrome,
    isFirefox
};
