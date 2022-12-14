module.exports = {
    important: true,
    content: ['./src/templates/*.(html|hbs)', './src/templates/components/*.hbs', './src/js/**.js'],
    theme: {
        extend: {
            aspectRatio: {
                'potrait': '9 / 16'
            }
        },
    },
    plugins: [
        'postcss-import',
        require('@tailwindcss/line-clamp'),
    ],
}