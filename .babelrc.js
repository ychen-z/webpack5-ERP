module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: ['>1%', 'last 2 versions', 'safari >= 7']
                }
            }
        ],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime', // 提取公共运行时代码（减小文件体积）
        ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持修饰器语法
        ['@babel/plugin-proposal-class-properties', { loose: true }], // 类语法编译
        '@babel/plugin-syntax-dynamic-import',
        ["@babel/plugin-proposal-private-methods", { "loose": true }]
    ]
};
