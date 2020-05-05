/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const path = require('path');
const os = require('os');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const config = require('./config');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const createHappyPlugin = (id, loaders) => new HappyPack({
    id,
    loaders,
    threadPool: happyThreadPool,
    verbose: process.env.HAPPY_VERBOSE === '1', // make happy more verbose with HAPPY_VERBOSE=1
});

const plugins = [
    new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'], // 这个是非必填的
    }),

    new VueLoaderPlugin(),
    createHappyPlugin('happy-babel', [{
        loader: 'babel-loader',
        options: {
            babelrc: true,
            cacheDirectory: true, // 启用缓存
        },
    }]),

    // 配置DillPlugin 使用
    new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '../'),
        // eslint-disable-next-line global-require
        manifest: require('../build/library/library.json'),
    }),
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            // messages: ['You application is running here http://localhost:3000'],
            // notes: ['Some additionnal notes to be displayed unpon successful compilation'],
        },
    }),
    // eslint-disable-next-line max-len
    new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, '../build/library/library_97857fd43da26620f02a.dll.js') }),

    // new HtmlWebpackExternalsPlugin({ //分离第三方依赖
    //     externals: [
    //         {
    //             module: 'react',
    //             entry:'cjs/react.production.min.js',
    //             // entry: 'https://unpkg.com/react@16/umd/react.production.min.js"',
    //             global: 'React'
    //         },
    //         {
    //             module: 'react-dom',
    //             entry:'cjs/react-dom.production.min.js',
    //             // entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
    //             global: 'ReactDom'
    //         }
    //     ]
    // }),
];

if (config.isPro) {
    plugins.concat([
        // new MiniCssExtractPlugin(
        //     {
        //         filename: '[name].css',
        //         chunkFilename: '[id].css',
        //         ignoreOrder: false, //
        //     }
        // )
    ]);
} else {
    plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new HardSourceWebpackPlugin(),

    ]);
}

module.exports = plugins;
