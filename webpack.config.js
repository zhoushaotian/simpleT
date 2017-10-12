const path = require('path');
module.exports = {
    entry: {
        simpleT: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['js']
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'eslint-loader',
                include: [path.join(__dirname, 'src')],
                enforce: 'pre',
            },
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src')]
            }
        ]
    }
}