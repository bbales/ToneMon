const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const Dashboard = require('webpack-dashboard/plugin')

// paths to our code
const PATHS = {
    app: './src/app.js',
    html: './index.html',
    style: './src/styles/main.scss',
    dist: path.join(__dirname, 'dist')
};

module.exports = {
    // input our code to be bundled
    entry: {
        javascript: PATHS.app,
        html: PATHS.html,
        css: PATHS.style
    },

    // spit out bundled code; set where it "mounts"
    output: {
        // path: PATHS.dist,
        publicPath: '/',
        filename: 'bundle.js'
    },

    // make a server work off.
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
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.(jpg|png)$/,
            loader: "file?name=[path][name].[ext]"
        }]
    },

    plugins: [new Dashboard()]
}
