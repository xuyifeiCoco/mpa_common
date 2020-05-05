/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const tempEntryList = ['vue_demo'];

const setMpa = () => {
    const entry = {};
    const htmlWebpackPlugin = [];
    const entryFiles = glob.sync(path.join(__dirname, '../src/views/*/index.js'));

    entryFiles.forEach((item) => {
        const match = item.match(/src\/views\/(.*)\/index\.js/);
        const pageName = match && match[1];
        if (tempEntryList.indexOf(pageName) > -1 || tempEntryList.length === 0) {
            entry[pageName] = `./src/views/${pageName}/index.js`;
            htmlWebpackPlugin.push(
                new HtmlWebpackPlugin({
                    // title: pageName,
                    filename: `${pageName}.html`,
                    template: path.join(__dirname, `../src/views/${pageName}/index.html`),
                    inject: true,
                    hash: true,
                    chunks: [pageName],
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                    },
                }),
            );
        }
    });
    return {
        entry,
        htmlWebpackPlugin,
    };
};

module.exports = setMpa;
