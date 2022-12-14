const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageJson = require('./package.json');

const globalTemplateVars = {
  version: packageJson.version
};

const templateConfig = (title, template, templateVars = {}) => (new HtmlWebpackPlugin({
    title,
    filename: `${template}.html`,
    template: `templates/${template}.hbs`,
    chunks: [template, 'commons'],
    inject: "head",
    inlineSource: '.(js|css)$',
    templateParameters: {
        ...globalTemplateVars,
        ...templateVars
    }
}));

const pages = [
    {
        title: 'WCAG Workshop',
        template: 'index'
    },
    {
        title: 'Flow Sample',
        template: 'flow'
    },
    {
        title: 'Sectioning Sample',
        template: 'sectioning',
    },
    {
        title: 'Phrasing Sample',
        template: 'phrasing'
    },
    {
        title: 'Embedded Sample',
        template: 'embedded'
    },
    {
        title: 'Interactive Sample',
        template: 'interactive'
    },
    {
        title: 'Keyboard navigation Sample',
        template: 'keyboard_navigation'
    },
    {
        title: 'Aria Sample',
        template: 'aria'
    },
    {
        title: 'Visive Cognition',
        template: 'vision'
    },
    {
        title: 'Zoom',
        template: 'zoom'
    },
    {
        title: 'Metodologie di analisi',
        template: 'methodologies'
    }
];

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
        index: './js/index.js',
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
                        esModule: false
                    }
                }
            },
        ]
    },
    plugins: [
        ...pages.map(({title, template, templateVars = {}}) => templateConfig(title, template, templateVars)),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        chunkIds: 'named',
    },
};