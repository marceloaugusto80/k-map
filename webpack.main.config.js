const copyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const { CleanPlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {

    target: "electron-main",

    mode: "development",

    entry: { main: "./src/main-process.ts"},

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [
            { test: /\.ts/, loader: "ts-loader" }
        ]
    },

    plugins: [
        new copyWebpackPlugin({
            patterns: [
                { from: "package.json"}
            ]
        })
    ]
}