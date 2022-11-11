const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Handlebars = require('handlebars');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles'),
            shadow: path.resolve(__dirname, 'src/js/shadow'),
        }
    },
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
        zoom: './js/pages/zoom',
        methodologies: './js/pages/methodologies',
        commons: './js/commons.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
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
                test: /\.(handlebars|hbs)$/,
                loader: "handlebars-loader",
                options: {
                    helperDirs: __dirname + '/src/js/helpers',
                    partialDirs: __dirname + '/src/templates/components'
                }
            },
            {
                test: /_component\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: false,
                        preprocessor: (content, {emitError}) => {
                            let result;

                            try {
                                result = Handlebars.compile(content)({
                                    publicPath: 'https://test.com'
                                });
                            } catch (error) {
                                emitError(error);

                                return content;
                            }

                            return result;
                        },
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WCAG Workshop',
            filename: 'index.html',
            template: 'templates/index.hbs',
            chunks: ['home', 'commons'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Flow Sample',
            filename: 'flow.html',
            template: 'templates/flow.hbs',
            chunks: ['flow', 'commons'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Sectioning Sample',
            filename: 'sectioning.html',
            template: 'templates/sectioning.hbs',
            chunks: ['commons', 'sectioning'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Phrasing Sample',
            filename: 'phrasing.html',
            template: 'templates/phrasing.hbs',
            chunks: ['commons', 'phrasing'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Embedded Sample',
            filename: 'embedded.html',
            template: 'templates/embedded.hbs',
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
            template: 'templates/interactive.hbs',
            chunks: ['commons', 'interactive'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Keyboard navigation Sample',
            filename: 'keyboard_navigation.html',
            template: 'templates/keyboard_navigation.hbs',
            chunks: ['commons', 'keyboard_navigation'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Aria Sample',
            filename: 'aria.html',
            template: 'templates/aria.hbs',
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
        new HtmlWebpackPlugin({
            title: 'Zoom',
            filename: 'zoom.html',
            template: 'templates/zoom.html',
            chunks: ['commons', 'zoom'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackPlugin({
            title: 'Metodologie di analisi',
            filename: 'methodologies.html',
            template: 'templates/methodologies.hbs',
            chunks: ['commons', 'methodologies'],
            inject: "head",
            inlineSource: '.(js|css)$'
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        chunkIds: 'named',
    },
};