const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DllReferencePlugin } = require("webpack");
const path = require("path");

const isDev = process.env.NODE_ENV != "production";

module.exports = {

    target: "electron-main",

    mode: isDev ? "development" : "production",

    entry: { main: "./src/main-process.ts"},

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "package.json"}
            ]
        }),
        new DllReferencePlugin({
            context: path.join(__dirname, "dist"),
            manifest: path.join(__dirname, "dist", "build", "vendor-manifest.json")
        })
    ]
}