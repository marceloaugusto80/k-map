const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DllReferencePlugin } = require("webpack");
const { CleanPlugin } = require("webpack");

const env = process.env.NODE_ENV;
const isDev = env != "production";

module.exports = {

    mode: isDev ? "development" : "production",

    target: "electron-renderer",

    devtool: isDev ? "source-map" : undefined, 

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
        }),
        new DllReferencePlugin({
            context: path.join(__dirname, "build"),
            manifest: path.join(__dirname, "build", "manifest.json")
        })
    ],

    devServer: {
        contentBase: "./dist/renderer",
        port: 9000
    }

}