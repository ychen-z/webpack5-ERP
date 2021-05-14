'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const appDirectory = fs.realpathSync(process.cwd());
const envPublicUrl = process.env.PUBLIC_URL;
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const ensureSlash = (path, needsSlash) => {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
};

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

const getServedPath = appPackageJson => {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
};

module.exports = {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    appIndex: resolveApp('src/index.js'),
    appSrc: resolveApp('src'),
    appJSCache: resolveApp('dev/jsCache'),
    appNodeModules: resolveApp('node_modules'),
    appCss: resolveApp('src/assets/css'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
};
