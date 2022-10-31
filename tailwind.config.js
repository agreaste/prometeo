module.exports = {
    important: true,
    content: ['./src/templates/*.html', './src/templates/components/*.html', './src/js/**.js'],
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