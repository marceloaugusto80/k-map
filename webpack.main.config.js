const path = require("path");
const { CleanPlugin } = require("webpack");

module.exports = {

    target: "electron-main",

    mode: "production",

    entry: { main: "./src/main-process.ts"},

    output: {
        path: path.resolve(__dirname, "dist", "main"),
        filename: "[name].js"
    },

    module: {
        rules: [
            { test: /\.ts/, loader: "ts-loader" }
        ]
    },

    plugins: [
        new CleanPlugin()
    ]
}