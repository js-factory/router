const operations = {
    '=': (a, b) => a === b,
    '>': (a, b) => a > b
};

const checkVersionSupport = (currentVersion, versionSetting, operator = '>') => {
    if (typeof versionSetting === 'undefined') {
        return true;
    }

    const formattedVersion = parseInt(currentVersion.split('.')[0], 10);
    return operations[operator](formattedVersion, versionSetting);
};

const checkBrowserSupport = (browserSetting = [], currentBrowser = '', currentVersion) => {
    const { length: len } = browserSetting;
    let i = 0;
    if (!len) {
        return false;
    }
    for (i; i < len; i += 1) {
        const { name = '', version, operator = '>' } = browserSetting[i]; // eslint-disable-line
        const isSupportedVersion = checkVersionSupport(currentVersion, version, operator);
        if (currentBrowser.toLowerCase().indexOf(name.toLowerCase()) !== -1 && isSupportedVersion) {
            return true;
        }
    }

    return false;
};
const isPwa = (props) => {
    const {
        platform,
        variantId,
        uaParser,
        getConfig
    } = props;

    const { name, version = '' } = uaParser.getBrowser();
    const browserCollection = getConfig('pwaBrowsers');
    const openForAllBrowsers = getConfig('pwaForAllBrowsers');
    const isSupportedBrowser = checkBrowserSupport(browserCollection, name, version);


    return platform === 'm' && (openForAllBrowsers || isSupportedBrowser || variantId === 1);
};

module.exports = {
    isPwa
};
