const path = require("path");
const bundleName = "bundle.js";
const srcPath = "./app/"
const outPath = "./";
const HtmlwebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {

    mode: "development",
    entry: srcPath + "src/app.module.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, outPath + "dist"),
        filename: bundleName
    },
    module: {
        rules: [
            { //For html 
                test: /\.html$/,
                exclude: /node_modules/,
                use: { loader: 'html-loader' }
            },
            { //For js to use ES6 notation
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            { // For css
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                loader: "file-loader?name=/public/icons/[name].[ext]",
                options: {
                    name: "./assets/[name].[ext]"
                }
            },
            {
                test: /\.(svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ]
            }]
    },
    plugins: [
        new HtmlwebpackPlugin({
            hash: true,
            template: "./app/src/index.html",
            filename: "./index.html"

        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: './app/src/manifest.json', to: './manifest.json' },
          ])
    ]


}




