module.exports = {
    host: 'localhost', // 默认是：localhost
    port: 8088, // 默认是：8080
    open: true, // 浏览器自启动
    hot: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    historyApiFallback: {
        rewrites: { from: /^\/index/, to: `/index.html` }
    },
    proxy: {
        // 开发
        '/mock/dev': {
            target: 'http://cpp2021-dev.netease.com/',
            secure: false,
            pathRewrite: {
                '^/mock/dev': ''
            },
            changeOrigin: true
        },
        // 测试
        '/mock/test': {
            target: 'http://cpp2021-test.netease.com/',
            secure: false,
            pathRewrite: {
                '^/mock/test': ''
            },
            changeOrigin: true,
            logLevel: 'debug' // this what you want
        },

        // 少军
        // '/mock/test/api/mbo': {
        //     target: 'http://10.219.168.196:8838',
        //     secure: false,
        //     pathRewrite: {
        //         '^/mock/test/api/mbo': ''
        //     },
        //     changeOrigin: true
        // },
        // '/mock/test/api/communal': {
        //     target: 'http://10.172.96.227:8800',
        //     secure: false,
        //     pathRewrite: {
        //         '^/mock/test/api/communal': '/api/communal'
        //     },
        //     changeOrigin: true
        // },
        // // nei mock
        '/mock/api/mbo/loginInfo': {
            target: 'http://mbo-new.dev.netease.com/',
            secure: false,
            pathRewrite: {
                '^/mock': ''
            },
            changeOrigin: true
        },
        '/mock/api/cpp/mng': {
            target: 'https://nei.hz.netease.com/api/apimock-v2/ba3e753ea4e356a8b856fff749e8ce15',
            secure: false,
            pathRewrite: {
                '^/mock/api/cpp/mng': ''
            },
            changeOrigin: true
        },
        '/mock/api': {
            target: 'http://mbo-new.dev.netease.com/',
            secure: false,
            pathRewrite: {
                '^/mock': ''
            },
            changeOrigin: true
        },
        '/yidun': {
            target: 'https://nos.netease.com/',
            secure: false,
            changeOrigin: true
        }
    },
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    // stats: {
    //     all: undefined,
    //     colors: true,
    //     modules: false,
    //     children: false,
    //     chunks: false,
    //     chunkModules: false,
    //     hash: false,
    //     timings: false,
    //     assets: false,
    //     entrypoints: false,
    //     version: false,
    //     builtAt: false
    // }
};
