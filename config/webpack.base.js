const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageName = require('../package.json').name;

module.exports = {
    entry: paths.appIndex,
    cache: {
        type: 'filesystem'
    },
    output: {
        path: paths.appBuild,
        publicPath: '/',
        filename: 'static/js/[name].bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${packageName}`
    },
    externals: {
        // 将CDN形式加载的包从打包范围中移除（业务层的引入方式不变）
        lodash: '_'
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', "css"],
        alias: {
            '@': paths.appSrc
        },

        fallback: {
            crypto: false,
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        }
    },
    // module: {
    //     strictExportPresence: true,
    //     rules: [{ parser: { requireEnsure: false } }]
    // },
    plugins: [
        // 动态生成html模板插件配置
        new HtmlWebpackPlugin({
            inject: true, // 是否将js放在body的末尾
            hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
            template: paths.appHtml,
            mobile: true,
            favicon: './public/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                useShortDoctype: true,
                html5: true
            },
            chunksSortMode: 'auto'
        }),

        // 打包忽略locale、moment
        // new webpack.IgnorePlugin({
        //     resourceRegExp: /^\.\/locale$/,
        //     contextRegExp: /moment$/,
        // }),

        // 与 devServer watchOptions 并存，不监听node_modules
        new webpack.WatchIgnorePlugin({
            paths: [path.join(__dirname, 'node_modules')]
        }),

        new WebpackBar({
            minimal: false,
            compiledIn: false
        })
    ],

    performance: {
        hints: false
    },

    //压缩js
    optimization: {
        moduleIds: 'named' // named
    },

    watch: false,

    stats: "error-only"
};
