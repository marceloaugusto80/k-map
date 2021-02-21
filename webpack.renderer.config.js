const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {

    mode: "development",

    target: "electron-renderer",

    devtool: "source-map",

    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        alias: { "react-dom": "@hot-loader/react-dom" }
    },

    entry: { renderer: "./src/renderer-process.tsx" }, 

    output: {
        path: path.resolve(__dirname, "dist", "renderer"),
        filename: "[name].js"
    },

    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader"},
            { test: /\.css$/, use: ["style-loader", "css-loader"]}
        ]
    },

    plugins: [
        new webpack.CleanPlugin(),
        new HtmlWebpackPlugin({filename: "index.html", template: "./src/index.html"}),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/resources", to: "resources" }
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}