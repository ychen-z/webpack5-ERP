const fs = require('fs');

module.exports = function getLessVariables(fileList) {
    let variables = {};
    fileList.forEach(file => {
        let themeContent = fs.readFileSync(file, 'utf-8');
        themeContent.split('\n').forEach(function(item) {
            if (item.startsWith('//') || item.indexOf('/*') > -1) return;
            let _pair = item.split(':');
            if (_pair.length < 2) return;
            let key = _pair[0].replace('\r', '').replace('@', '');
            if (!key) return;
            let value = _pair[1]
                .replace(';', '')
                .replace('\r', '')
                .replace(/^\s+|\s+$/g, '')
                .replace(/(\s*\/\/.*)/g, '');
            variables[key] = value;
        });
    });
    return variables;
};
