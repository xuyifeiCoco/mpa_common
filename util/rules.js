const { resolveApp } = require('./index');

const rules = [
    {
        test: /\.(js|jsx)$/,
        // enforce: 'pre',
        use: ['happypack/loader?id=happy-babel'],
        include: resolveApp('src'),
        exclude: /node_modules/,
    },
    {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader?cacheDirectory=true',
        exclude: /node_modules/,
        include: resolveApp('src'),
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader?cacheDirectory=true',
        exclude: /node_modules/,
        include: resolveApp('src'),
        options: {
            cacheDirectory: true, // 启用缓存
            loaders: {
                scss: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                sass: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax',
                ],
            },
        },
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            // {
            //     loader: MiniCssExtractPlugin.loader,
            //     options: {
            //         // you can specify a publicPath here
            //         // by default it uses publicPath in webpackOptions.output
            //         // publicPath: '../',
            //         hmr: process.env.NODE_ENV === 'development',
            //     },
            // },
            'css-loader'],
    },

    {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
        ],
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {
                outputPath: 'images/[name]_[hash:8].[ext]',
            }
            ,
        }],
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
            loader: 'file-loader',
            options: {
                outputPath: 'fonts/[name]_[hash:8].[ext]',
            }
            ,
        }],
    },

];

module.exports = rules;
