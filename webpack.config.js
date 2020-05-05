// webpack.config.js
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const config = require('./util/config');

const setMpa = require('./util/setMpa');

const { entry, htmlWebpackPlugin } = setMpa();
const { resolveApp } = require('./util/index');
const plugins = require('./util/plugins');
const rules = require('./util/rules');

const webpackConfig = {
    entry,
    mode: config.mode,
    output: {
        filename: '[name]_[chunkhash:8].js', // chunkhash根据模块划分
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@': path.resolve('src'), // 缓存src目录为@符号，避免重复寻址
        },
        extensions: ['.js'],
        modules: [
            resolveApp('node_modules'),
        ],
    },
    devtool: config.isPro ? 'none' : 'source-map', // cheap-source-map 可以看到具体哪一行报错  source-map 可以看到那一列
    module: {
        rules,
    },

    plugins: plugins.concat(htmlWebpackPlugin),
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                // test: /\.js(\?.*)?$/i,
                parallel: true,
                cache: true,
            }),
        ],
        splitChunks: {
            // minSize: 0,//文件的最小值
            // cacheGroups: {
            //     commons: { //抽离公共组件
            //         name: 'commons',
            //         chunks: 'all',
            //         minChunks: 2
            //     }
            // }
            // cacheGroups: {
            //     commons: {
            //         test: /(react|react-dom)/,
            //         name: 'vendors',
            //         chunks: 'all'
            //     }
            // }

        },
    },
};

if (!config.isPro) {
    webpackConfig.devServer = {
        contentBase: './dist',
        host: '0.0.0.0',
        port: '9000',
        open: false,
        quiet: true,
    };
}
module.exports = webpackConfig;
