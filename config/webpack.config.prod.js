const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin') // 生成一个server-worker用于缓存
const safePostCssParser = require('postcss-safe-parser');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');

const smp = new SpeedMeasurePlugin();
const baseWebpackConfig = require('./webpack.base');
const paths = require('./path');
const publicPath = paths.servedPath;
const PUBLIC_PATH = '/';

const vendorEntry = require(paths.vendorConfig).entry;

const webpackConfig = smp.wrap(
    merge(baseWebpackConfig, {
        mode: 'production',
        entry: Object.assign(
            // 合并分离打包入口文件
            {
                main: [/*require.resolve('./polyfills'),*/ paths.appIndexJs]
            },
            vendorEntry
        ),
        output: {
            // The build folder.
            path: paths.appBuild,
            // Generated JS file names (with nested folders).
            // There will be one main bundle, and one file per asynchronous chunk.
            // We don't currently advertise code splitting but Webpack supports it.
            filename: 'static/js/[name].[chunkhash:8].js',
            chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
            // We inferred the "public path" (such as / or /my-project) from homepage.
            publicPath: publicPath,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
        },
        module: {},
        plugins: [
            new BundleAnalyzerPlugin(),
            /**
             * 在window环境中注入全局变量
             * 这里这么做是因为src/serviceWorker.js中有用到，为了配置PWA
             * */
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    PUBLIC_URL: PUBLIC_PATH.replace(/\/$/, '')
                })
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
            }),

            // new OptimizeCSSAssetsPlugin({
            //   cssProcessorOptions: {
            //     parser: safePostCssParser,
            //     safe: true
            //   }
            // }), // use OptimizeCSSAssetsPlugin
            // new WebpackParallelUglifyPlugin({
            //   uglifyJS: {
            //     output: {
            //       beautify: false, // 不需要格式化
            //       comments: false // 不保留注释
            //     },
            //     compress: {
            //       warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            //       drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            //       collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            //       reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
            //     }
            //   }
            // }),
            // new PrerenderSPAPlugin({
            //   routes: ['/'],
            //   staticDir: path.join(basePath, 'dist')
            // }),

            // 生成一个server-work用于缓存资源（PWA）
            // new SWPrecacheWebpackPlugin({
            //     dontCacheBustUrlsMatching: /\.\w{8}\./,
            //     filename: 'service-worker.js',
            //     logger(message) {
            //         if (message.indexOf('Total precache size is') === 0) {
            //             return;
            //         }
            //         if (message.indexOf('Skipping static resource') === 0) {
            //             return;
            //         }
            //         console.log(message);
            //     },
            //     minify: true, // 压缩
            //     navigateFallback: PUBLIC_PATH, // 遇到不存在的URL时，跳转到主页
            //     navigateFallbackWhitelist: [/^(?!\/__).*/], // 忽略从/__开始的网址，参考 https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /\.cache$/] // 不缓存sourcemaps,它们太大了
            // }),
            new webpack.HashedModuleIdsPlugin()
            // 这里是用于把manifest.json打包时复制到/dist下 （PWA）
            // new CopyWebpackPlugin([{ from: path.join(basePath, './public/manifest.json'), to: path.join(outDir, './manifest.json') }]),

            // new CleanWebpackPlugin(path.join(__dirname, 'build'))
        ],
        optimization: {
            // sideEffects: false,
            minimize: true,
            concatenateModules: true,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // we want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minfication steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending futher investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true
                        }
                    },
                    // Use multi-process parallel running to improve the build speed
                    // Default number of concurrent runs: os.cpus().length - 1
                    parallel: true,
                    // Enable file caching
                    cache: true,
                    sourceMap: false
                }),
                // This is only used in production mode
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: false
                    }
                })
            ],
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'initial', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
                        minChunks: 2, // 模块被引用>=2次，便分割
                        maxInitialRequests: 5, // 一个入口并发加载的chunk数量<=3
                        minSize: 0
                    },
                    antd: {
                        name: 'chunk-antd', // 单独将 antd 拆包
                        priority: 15, // 权重需大于其它缓存组
                        test: /[\/]node_modules[\/]antd[\/]/
                    },
                    vendor: {
                        test: /node_modules\/(.*)\.js/, // 表示默认拆分node_modules中的模块
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        reuseExistingChunk: false
                        // enforce: true
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(css)$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
                // //最小的文件大小 超过之后将不予打包
                // minSize: {
                //   javascript: 0,
                //   style: 0
                // },
                // //最大的文件 超过之后继续拆分
                // maxSize: {
                //   javascript: 1, //故意写小的效果更明显
                //   style: 3000
                // }
            },
            // Keep the runtime chunk separated to enable long term caching
            runtimeChunk: true
        },
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        },
        performance: {
            hints: false
        }
    })
);

module.exports = webpackConfig;
