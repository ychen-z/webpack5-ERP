module.exports = {
    extends: ['react-app', 'eslint:recommended'],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6, // 指定要使用的ECMAScript6版本
        sourceType: 'module',
        ecmaFeatures: { 'jsx': true } //启用JSX
    },

    plugins: ['prettier'],

    rules: {
        /* 以下为过渡方案（后期会改成error） */
        // 声明与类型
        'no-undef': 'warn', // 禁用未声明的变量
        'no-redeclare': 'warn', // 禁止多次声明同一变量
        'no-unused-vars': 'warn', // 禁止出现未使用过的变量
        'no-cond-assign': 'warn', // 禁止条件表达式中出现赋值操作符
        'no-class-assign': 'warn', // 禁止修改类声明的变量
        'no-extra-boolean-cast': 'warn', // 禁止不必要的布尔转换
        'eqeqeq': 'warn', // 强制使用===而不是==

        // 其它
        'no-mixed-spaces-and-tabs': 'warn', // 禁止空格和 tab 的混合缩进
        'no-case-declarations': 'warn', // 禁止在 case 子句中使用词法声明
        'no-console': 'off', // 允许使用console
        'no-': 'off',

        'prettier/prettier': 'warn', // 对于prettier报错进行warn提醒
    }
}
