const path = require("path");
const bundleName = "bundle.js";
const appPath = "./app/";
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {

    mode : "development",
    entry : appPath + "src/app.module.js",
    devtool: "source-map",
    output : {
        path : path.resolve(__dirname, appPath + "dist"),
        filename : bundleName
    },
    module : {
        rules : [
            { //For html 
                test : /\.html$/,
                exclude : /node_modules/,
                use: { loader: 'html-loader' }
            },
            { //For js to use ES6 notation
                test : /\.js$/,
                exclude : /node_modules/,
                use : {loader: 'babel-loader'}
            },
            { // For css
                test : /\.css$/,
                use : ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }]
    },


}




