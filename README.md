# webpack-learning

## 简介

这是一群热爱前端的同学，为了提升平时的开发效率，经过一番精心调研而诞生的一款**基于 React + Webpack**的前端项目脚手架。

该项目则是站在业务层的角度，对该 SDK 进行较为通用性的封装。

## 为什么会有这个项目？

-   以前没有项目脚手架
-   原项目中使用的包版本过低
-   原项目开发（编译/打包）效率欠佳
-   不支持 React 16、Webpack 4 等主流工具的新版本/特性

## 目前已支持

-   [x] React v16.9.0
-   [x] Webpack v4.39.1
-   [x] 校验工具：ESLint & Stylelint & Prettier
-   [x] Husky
-   [x] DLL 动态链接库
-   [x] axios 目录结构整理
-   [x] 支持全局引入 variables.less & antd-reset.less

## TODO

-   [ ] proxy 整理
-   [ ] redux & reducer 整理
-   [ ] routes 目录结构整理
-   [ ] 组件目录结构整理
-   [ ] webpack 多入口配置
-   [ ] 引入 TypeScript（待定）
-   [ ] 等...

## 使用方式

```js
// Install all npm packages
1 、yarn install
// or
npm install

2、yarn build-vendor

3、yarn start

4、yarn build
```

## 目录结构

```
project
│   README.md
│   .babelrc
│   .eslintrc.js
│   .prettierrc.js
│   .stylelintrc.js
│
└───config // webpack、dll配置
│   │   webpack.base.js
│   │   webpack.config.dev.js
│   │   webpack.config.prod.js
│   │   ...
│
└───src // 项目源文件
│   │   App.js
│   │   index.js
│   │   Page.js
|   |
|   |____components // 组件
│   |   |____common // 通用组件
│   |   |    |   ...
│   |   |
│   |   | ... // 业务组件
|   |
|   |____view // 页面
|   |
|   |____axios // 请求
|   |   | api // 接口
|   |   | tools.js // axios二次封装
|   |   | config.js // 接口环境变量
|   |
|   |____routes // 路由
|   |   | index.js
|   |
|   |____store // reducer
|   |   | action
|   |   | reducer
|   |
|   |____utils // 工具函数
|   |   | tool.js
|
└───public
│   │   index.html
```

## 更新历史

-   v0.0.1 —— 2019-08-20
    -   模板项目雏形
    -   引入 hooks 参考 doc/hook.md

## License

The code is distributed under the [MIT](https://opensource.org/licenses/MIT) license
