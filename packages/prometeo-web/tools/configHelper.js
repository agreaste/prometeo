import HtmlWebpackPlugin from "html-webpack-plugin";

export const templateConfig = (title, template) => (new HtmlWebpackPlugin({
    title,
    filename: `${template}.html`,
    template: `templates/${template}.hbs`,
    chunks: [template, 'commons'],
    inject: "head",
    inlineSource: '.(js|css)$'
}));