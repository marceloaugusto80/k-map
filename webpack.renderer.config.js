const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanPlugin } = require("webpack");

module.exports = {

    mode: "development",

    target: "electron-renderer",

    devtool: "eval",

    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"]
    },

    entry: { renderer: "./src/renderer-process.tsx" }, 

    output: {
        path: path.resolve(__dirname, "dist", "renderer"),
        filename: "[name].js"
    },

    module: {
        rules: [
            { test: /\.tsx?$/, include: path.resolve(__dirname, "src"), use: "ts-loader"},
            { test: /\.css$/, include: path.resolve(__dirname, "src") , use: ["style-loader", "css-loader"]}
        ]
    },

    plugins: [
        new CleanPlugin(),
        new HtmlWebpackPlugin({filename: "index.html", template: "./src/index.html"}),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/resources", to: "resources" }
            ]
        })
    ]

}