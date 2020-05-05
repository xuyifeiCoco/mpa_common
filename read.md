<!-- https://juejin.im/post/5e9ada576fb9a03c391300a1 -->
#多页面打包方案

`公共模块的分离`
    1、通过cdn引入  利用html-webpack-element-plugin
    2、利用splitChunksPlugin  替代commonsChunkPlugin


`解析es6和react`
    1、babel-laoder    yarn add babel-loader @babel/core @babel/preset-env  -D
    2、.babelrc   文件

    react
       yarn add @babel/preset-react -D

`tree shaking`  去除不用的方法

`Dllplugin   DllReferncePlugin` 分离包    webpack.dll.jd

`利用缓存` 提升二次构建速度
    1、babel-loader 开启缓存   `'babel-loader?cacheDirectory=true',`
    2、terser-webpack-plugin 开启缓存
    3、使用cash-loader或者hard-source-webpack-plugin  模块转换

`热更新原理`

`抽离css`  mini-css-extract-plugin

`代码分割`  
    懒加载js    动态 import   @babel/plugin-syntax-dynamic-import 

`添加eslint`  yarn add eslint babel-eslint eslint-config-airbnb-base -D
    新建


`添加ts支持`
    tsc --init
    yarn add ts-loader -D
    yarn add typescript -D

`引入vue`
   yarn add  vue-style-loader vue-loader vue-template-compiler -D
   const VueLoaderPlugin = require('vue-loader/lib/plugin');
   new VueLoaderPlugin(),

`错误提示`
    friendly-errors-webpack-plugin 




    

