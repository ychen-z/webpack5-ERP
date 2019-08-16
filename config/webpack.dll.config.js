const webpack = require('webpack');
const path = require('path');
const paths = require('./path');

module.exports = {
    entry: {
        react: ['react', 'react-router-dom', 'react-dom', 'antd']
    },
    output: {
        path: paths.vendor,
        filename: '[name].dll.js',
        library: '_dll_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(paths.vendor, '[name].manifest.json')
        })
    ]
};
