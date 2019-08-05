const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const WebpackBar = require('webpackbar');
const paths = require('./path');
// const PnpWebpackPlugin = require('pnp-webpack-plugin'); 看看是否必须
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

const isProduction = paths.isProduction;
const isDevelopment = !isProduction;
const publicPath = '/';
const shouldUseSourceMap = paths.sourceMap;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isProduction && MiniCssExtractPlugin.loader,
        !isProduction && require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: cssOptions
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    //require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009'
                        },
                        stage: 3
                    })
                ],
                sourceMap: isProduction ? shouldUseSourceMap : !isProduction
            }
        }
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: Object.assign({}, { sourceMap: isProduction ? shouldUseSourceMap : !isProduction }, cssOptions)
        });
    }
    return loaders;
};

module.exports = {
    cache: {
        type: 'filesystem'
    },
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output. This does
        // not produce a real file. It's just the virtual path that is served by
        // WebpackDevServer in development. This is the JS bundle containing code from
        // all our entry points, and the Webpack runtime.
        filename: 'static/js/bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'static/js/[name].chunk.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win" if there
        // are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: ['node_modules', paths.appNodeModules],
        // These are the reasonable defaults supported by the Node ecosystem. We also
        // include JSX as a common component filename extension to support some tools,
        // although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290 `web`
        // extension prefixes have been added for better support for React Native Web.
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {
            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-
            // native-for-web/ 'react-native': 'react-native-web', 全局相对路径别名，处理相对路径过长和繁琐问题
            '@': paths.appSrc
        }
        // plugins: [PnpWebpackPlugin]
    },

    // resolveLoader: {     plugins: [PnpWebpackPlugin.moduleLoader(module)] },
    module: {
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },

            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint')
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: paths.appSrc
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // "url" loader works like "file" loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    // Process any JS outside of the app with Babel.
                    // Unlike the application JS, we only compile the standard ES features.
                    {
                        test: /\.(js|jsx)$/,
                        include: paths.appSrc,
                        //loader: require.resolve('babel-loader'),
                        use: 'happypack/loader?id=babel',
                        // options: {
                        //     customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                        //     plugins: [
                        //         [
                        //             require.resolve('babel-plugin-named-asset-import'),
                        //             {
                        //                 loaderMap: {
                        //                     svg: {
                        //                         ReactComponent: '@svgr/webpack?-svgo![path]'
                        //                     }
                        //                 }
                        //             }
                        //         ],
                        //         ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
                        //     ],
                        //     cacheDirectory: true,
                        //     cacheCompression: isProduction,
                        //     compact: isProduction
                        // }
                    },
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use a plugin to extract that CSS to a file, but
                    // in development "style" loader enables hot editing of CSS.
                    // By default we support CSS Modules with the extension .module.css

                    // Opt-in support for LESS (using .less extensions).
                    {
                        test: lessRegex,
                        use: getStyleLoaders(
                            {
                                importLoaders: 3,
                                sourceMap: isProduction ? shouldUseSourceMap : isDevelopment,
                                modifyVars: {
                                    'primary-color': '#e6231f'
                                },
                                javascriptEnabled: true
                            },
                            'less-loader'
                        ),
                        sideEffects: true
                    },
                    {
                        test: lessModuleRegex,
                        use: getStyleLoaders(
                            {
                                importLoaders: 3,
                                sourceMap: isProduction ? shouldUseSourceMap : isDevelopment,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent
                            },
                            'less-loader'
                        )
                    },

                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1
                        })
                    },
                    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                    // using the extension .module.css
                    {
                        test: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        })
                    },

                    // "file" loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn't use a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // its runtime that would otherwise be processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
        ]
    },
    plugins: [
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            threadPool: happyThreadPool,
            verbose: true,
            threads: 4, // 不知为何写了threads 反而变慢了 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: ['babel-loader?cacheDirectory']
        }),

        // 暂停使用happypack编译less: https://github.com/amireh/happypack/issues/223
        // new HappyPack({
        //     // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        //     id: 'node_modules_less',
        //     threads: 2, // 不知为何写了threads 反而变慢了
        //     // threadPool: happyThreadPool,
        //     verbose: true,
        //     // 如何处理 .less 文件，用法和 Loader 配置中一样
        //     loaders: cssLoaders({
        //         sourceMap, extract: isProduction, usePostCSS: false, // 编译 antd less时无法引入postcss
        //         modules: false
        //     }).less
        // }),

        new HtmlWebpackPlugin({
            inject: true, // 是否将js放在body的末尾
            hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
            // template: require('html-webpack-template'), template:
            // 'node_modules/html-webpack-template/index.ejs',
            template: paths.appHtml,
            mobile: true,
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
            chunksSortMode: 'dependency'
            // scripts: ['./dll/vendor.dll.js'] // 与dll配置文件中output.fileName对齐
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // 与 devServer watchOptions 并存，不监听node_modules
        new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
        new WebpackBar({
            minimal: false,
            compiledIn: false
        })
    ],
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    performance: false
};
