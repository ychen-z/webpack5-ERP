module.exports = {
    extends: ['react-app', 'eslint:recommended'],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6, // 指定要使用的ECMAScript6版本
        sourceType: 'module',
        ecmaFeatures: { 'jsx': true } //启用JSX
    },

    plugins: ['prettier', 'react-hooks'],

    rules: {
        'arrow-parens': ['error', 'as-needed'], // 箭头函数参数只有一个时，可以省略参数的括号，否则error提示

        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境中不允许使用debugger

        'no-console': 'off', // 允许使用console

        'react/jsx-no-target-blank': 'off', // a链接允许直接使用_blank

        'prettier/prettier': 'warn', // 对于prettier报错进行warn提醒

        'jsx-a11y/anchor-has-content': 'off',

        "react-hooks/rules-of-hooks": "error",

        "react-hooks/exhaustive-deps": "warn"
    }
}
