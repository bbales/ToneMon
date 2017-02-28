const webpack = require('webpack');
const path = require('path');

// paths to our code
const PATHS = {
    app: './src/app.js',
    html: './index.html',
    dist: path.join(__dirname, '')
};

module.exports = {
    entry: {
        javascript: PATHS.app,
        html: PATHS.html,
    },

    output: {
        publicPath: '',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: PATHS.dist
    },

    module: {
        loaders: [{
            test: /\.html$/,
            loader: "file?name=[name].[ext]"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }, {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.(jpg|png)$/,
            loader: "file?name=[path][name].[ext]"
        }]
    }
}
