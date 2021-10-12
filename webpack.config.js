const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = (env, options) => {
    return {
        devtool: options.mode === 'development' ? 'eval-source-map' : false,
        entry: './src/index.js',
        output: {
            filename: process.env.WEBPACK_SERVE ? '[name].js' : '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
        },
        externals: {},
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                filename: './index.html',
                template: './src/index.html',
            }),
            new InjectManifest({
                swSrc: './src/firebase-messaging-sw.js',
            }),
        ],
        resolve: {
            extensions: ['.js'],
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
            overlay: true,
        },
    }
}
