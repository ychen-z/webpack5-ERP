
/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const paths = require("./path");
const getLessVariables = require("./../src/utils/get-less-variables");
// const PnpWebpackPlugin = require('pnp-webpack-plugin'); 看看是否必须
// const HappyPack = require('happypack');
// const os = require('os');

// const happyThreadPool = HappyPack.ThreadPool({
//     size: os.cpus().length
// });

const isProduction = paths.isProduction;
const isDevelopment = !isProduction;
const publicPath = "/";
const shouldUseSourceMap = paths.sourceMap;

// style files regexes
const cssRegex = /\.css$/;
const lessRegex = /\.less$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isProduction && MiniCssExtractPlugin.loader,
        !isProduction && require.resolve("style-loader"),
        {
            loader: require.resolve("css-loader"),
            options: cssOptions
        },
        {
            loader: require.resolve("postcss-loader"),
            options: {
                ident: "postcss",
                plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    require("postcss-preset-env")({
                        autoprefixer: {
                            flexbox: "no-2009"
                        },
                        browsers: ["> 1%", "last 2 versions"], // autoprefixer 前缀命令
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
            options: Object.assign(
                {},
                { sourceMap: isProduction ? shouldUseSourceMap : !isProduction },
                cssOptions
            )
        });
    }
    return loaders;
};

// 参考文档：https://zhuanlan.zhihu.com/p/45506253
module.exports = {
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        filename: "static/js/bundle.js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
    },
    resolve: {
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: ["node_modules", paths.appNodeModules],
        extensions: [".js", ".json", ".jsx"],
        alias: {
            "@": paths.appSrc
        }
        // plugins: [PnpWebpackPlugin]
    },

    // resolveLoader: {     plugins: [PnpWebpackPlugin.moduleLoader(module)] },
    module: {
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },

            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                use: [
                    {
                        options: {
                            formatter: require.resolve("react-dev-utils/eslintFormatter"),
                            eslintPath: require.resolve("eslint")
                        },
                        loader: require.resolve("eslint-loader")
                    }
                ],
                include: paths.appSrc
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: 10000,
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    },
                    //  参考：https://juejin.im/post/5bff60ab5188250f3e1d2933
                    {
                        test: /\.(js|jsx)$/,
                        include: paths.appSrc,
                        exclude: /node_modules/,
                        loader: require.resolve("babel-loader"),
                        //use: 'happypack/loader?id=babel',
                        options: {
                            customize: require.resolve(
                                "babel-preset-react-app/webpack-overrides"
                            ),
                            plugins: [
                                [
                                    require.resolve("babel-plugin-named-asset-import"),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: "@svgr/webpack?-svgo![path]"
                                            }
                                        }
                                    }
                                ],
                                [
                                    "import",
                                    { libraryName: "antd", libraryDirectory: "es", style: true }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: isProduction,
                            compact: isProduction
                        }
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
                                modifyVars: getLessVariables([
                                    "src/assets/css/variables.less",
                                    "src/assets/css/antd-reset.less"
                                ]),
                                javascriptEnabled: true
                            },
                            "less-loader"
                        ),
                        sideEffects: true
                    },

                    {
                        test: cssRegex,
                        exclude: /node_modules/,
                        include: paths.appSrc,
                        use: getStyleLoaders({
                            importLoaders: 1
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
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new HappyPack({
        //     // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        //     id: 'babel',
        //     threadPool: happyThreadPool,
        //     verbose: true,
        //     threads: 4, // 不知为何写了threads 反而变慢了 如何处理 .js 文件，用法和 Loader 配置中一样
        //     loaders: ['babel-loader?cacheDirectory']
        // }),

        new HtmlWebpackPlugin({
            inject: true, // 是否将js放在body的末尾
            hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
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
            chunksSortMode: "dependency"
            // scripts: ['./dll/vendor.dll.js'] // 与dll配置文件中output.fileName对齐
        }),

        new webpack.DllReferencePlugin({
            manifest: path.join(paths.vendor, "react.manifest.json")
        }),

        new CopyWebpackPlugin([
            {
                from: paths.vendor, //静态资源目录源地址
                to: path.join(paths.appBuild, "vendor") //目标地址，相对于output的path目录
            }
        ]),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // 与 devServer watchOptions 并存，不监听node_modules
        new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")]),
        new WebpackBar({
            minimal: false,
            compiledIn: false
        })
    ],
    node: {
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },

    performance: {
        hints: false
    },

    optimization: {
        namedModules: true,
        nodeEnv: "development"
    }
};
