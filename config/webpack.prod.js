const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const baseWebpackConfig = require('./webpack.base');
const paths = require('./paths');
const { sourceMapEnabled } = require('./env');

const webpackConfig = smp.wrap(
    merge(baseWebpackConfig, {
        mode: 'production',
        devtool:"source-map",
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 10000,
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        },
                        {
                            test: /\.less$/,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 2,
                                        sourceMap: sourceMapEnabled
                                    }
                                },
                                {
                                    loader: require.resolve('less-loader'),
                                    options: {
                                        sourceMap: sourceMapEnabled,
                                        lessOptions: {
                                            javascriptEnabled: true
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
                            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
                            loader: require.resolve('file-loader'),
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),

            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                ignoreOrder: true
            }),

            new webpack.ids.HashedModuleIdsPlugin()
        ],
        optimization: {
            minimize: true,
            concatenateModules: true,
            splitChunks: {
                chunks: 'all',
                minSize: {
                    javascript: 20000
                }
            },

            minimizer: [new CssMinimizerPlugin()],

            // 生成runtime chunk，以达到优化持久化缓存的目的
            // runtimeChunk: true
            runtimeChunk: {
                name: entrypoint => `runtime~${entrypoint.name}`
            }
        },
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    })
);

module.exports = webpackConfig;
