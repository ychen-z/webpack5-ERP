const paths = require('./config/env');
const shouldUseSourceMap = paths.sourceMap;

module.exports = ({ env, options }) => ({
    plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
            autoprefixer: {
                ...options.autoprefixer,
                flexbox: 'no-2009'
            },
            stage: 3
        })
    ],
    sourceMap: env === 'production' ? shouldUseSourceMap : true
})
