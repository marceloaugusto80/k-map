const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanPlugin } = require("webpack");

module.exports = {

    mode: "development",

    target: "electron-renderer",

    devtool: "source-map",

    resolve: {
        extensions: [".css", ".js", ".ts", ".jsx", ".tsx"]
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
        new CleanPlugin(),
        new HtmlWebpackPlugin({filename: "index.html", template: "./src/index.html"}),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/resources", to: "resources" }
            ]
        })
    ]

}