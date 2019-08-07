const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    cache: true,
    devtool: 'cheap-module-eval-source-map', // 报错的时候在控制台输出哪一行报错
    watchOptions: {
        // ignored: [/node_modules/, '/dll/'], // 不监听目录
        aggregateTimeout: 300, // 防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000 // 每秒询问的文件变更的次数
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
    devServer: {
        // 为了减少输出量，可以只显示错误
        // 开发环境的 host 和 port，允许自定义
        // 如果你使用 Docker, Vagrant 或 Cloud9 虚拟机，
        // 你可以设置 host: "0.0.0.0";
        // 不像默认的 `localhost`，0.0.0.0 适用于所有的网络设备。
        host: process.env.HOST, // 默认是：`localhost`
        port: process.env.PORT, // 默认是：8080
        open: true, // 浏览器自启动
        quiet: true,
        overlay: true, // 开启浏览器端的错误浮层功能
        proxy: {
            '/api/*': {
                target: 'http://10.171.160.132:8800',
                pathRewrite: {
                    '/api': '/api'
                },
                secure: false
            }
        },
        watchOptions: {
            // Delay the rebuild after the first change
            // 非常好性能, 根据情况进行注释
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000
        }
    },
    performance: {
        hints: false
    }
});

module.exports = webpackConfig;
