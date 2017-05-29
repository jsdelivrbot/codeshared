let debug = process.env.NODE_ENV !== 'production';
let webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap': null,
    entry: ['./scripts/app.js'],
    output: {
        path: __dirname + "/js",
        filename: "script.min.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
}
