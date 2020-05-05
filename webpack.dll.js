const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    entry: {
        library: [
            'react',
            'react-dom',
            'vue',
        ],
    },
    output: {
        filename: '[name]_[hash].dll.js',
        path: path.join(__dirname, '/build/library'),
        library: '[name]',
    },
    plugins: [
        new CleanWebpackPlugin(
            {
                cleanAfterEveryBuildPatterns: ['build'], // 这个是非必填的
            },
        ),
        new Webpack.DllPlugin(
            {
                context: __dirname, // 上下文必填
                name: '[name]',
                path: path.join(__dirname, '/build/library/[name].json'),
            },
        ),
    ],
};
