const path = require('path');
const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        home: './js/index.js',
        flow: './js/pages/flow.js',
        sectioning: './js/pages/sectioning.js',
        phrasing: './js/pages/phrasing.js',
        embedded: './js/pages/embedded.js',
        interactive: './js/pages/interactive.js',
        keyboard_navigation: './js/pages/keyboard_navigation.js',
        aria: './js/pages/aria',
        vision: './js/pages/vision',
        commons: './js/commons.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: 'media',
                    outputPath: 'media'
                },
            },
            {
                test: /_component\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: false
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Shadow component test',
            filename: 'index.html',
            template: 'templates/index.html',
            chunks: ['home', 'commons'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Flow Sample',
            filename: 'flow.html',
            template: 'templates/flow.html',
            chunks: ['flow', 'commons'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Sectioning Sample',
            filename: 'sectioning.html',
            template: 'templates/sectioning.html',
            chunks: ['commons', 'sectioning'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Phrasing Sample',
            filename: 'phrasing.html',
            template: 'templates/phrasing.html',
            chunks: ['commons', 'phrasing'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Embedded Sample',
            filename: 'embedded.html',
            template: 'templates/embedded.html',
            chunks: ['commons', 'embedded'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Iframe Sample',
            filename: 'card.html',
            template: 'templates/card.html',
            chunks: ['commons'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Interactive Sample',
            filename: 'interactive.html',
            template: 'templates/interactive.html',
            chunks: ['commons', 'interactive'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Keyboard navigation Sample',
            filename: 'keyboard_navigation.html',
            template: 'templates/keyboard_navigation.html',
            chunks: ['commons', 'keyboard_navigation'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Aria Sample',
            filename: 'aria.html',
            template: 'templates/aria.html',
            chunks: ['commons', 'aria'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Visive Cognition',
            filename: 'vision.html',
            template: 'templates/vision.html',
            chunks: ['commons', 'vision'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new MiniCssExtractPlugin(),
        new DefinePlugin({
            PUBLIC_PATH: ""
        })
    ],
    optimization: {
        chunkIds: 'named',
    },
};