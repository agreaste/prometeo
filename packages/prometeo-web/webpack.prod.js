const {merge} = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: "production",
    output: {
        publicPath: "https://agreaste.github.io/prometeo"
    }
});