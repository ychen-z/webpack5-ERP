const path = require('path');
const { merge } = require('webpack-merge');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base');
const devServer = require('./webpack-dev-server.config');
const paths = require('./paths');
const publicPath = process.env.NODE_ENV === 'production' ? 'https://mbo.netease.com' : `http://localhost:8080`;

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            react: require.resolve('react')
        }
    },
    
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                            publicPath
                        }
                    },
                    {
                        test: /\.less$/,
                        use: [
                            require.resolve('style-loader'),
                            require.resolve('css-loader'),
                            {
                                loader: require.resolve('less-loader'),
                                options: {
                                    sourceMap: false,
                                    lessOptions: {
                                        javascriptEnabled: true,
                                        modifyVars: {
                                            '@ant-prefix': 'pre',
                                            "@primary-color":"red"
                                        }
                                    }
                                }
                            },
                            {
                                loader: 'style-resources-loader',
                                options: {
                                    patterns: [path.resolve(paths.appCss, 'antd-style.less'), path.resolve(paths.appCss, 'variables.less')],
                                    injector: 'append'
                                }
                            }
                        ],
                        sideEffects: true
                    },
                    {
                        test: /\.(j|t)sx?$/,
                        include: paths.appSrc,
                        exclude: /node_modules/,
                        use: [{
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent: '@svgr/webpack?-svgo![path]'
                                                }
                                            }
                                        }
                                    ],
                                    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }] // antd样式按需引入
                                ],
                                cacheDirectory: true, // 缓存首次构建的编译结果
                                cacheCompression: false, // 不需要压缩缓存，gizp压缩需要耗时
                                compact: false
                            }
                        }]
                    },
                    {
                        test: /\.css$/,
                        exclude: /node_modules/,
                        include: paths.appSrc,
                        use: ["style-loader", "css-loader"],
                    },
                    {
                        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/, /\.md$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }), new webpack.HotModuleReplacementPlugin()],
    devServer
});

module.exports = webpackConfig;
