const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, '../v1/public/js'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        alias: {},
        extensions: ['.js', '.jsx']
    }
}