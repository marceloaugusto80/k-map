const { DllPlugin } = require("webpack");
const path = require("path");

module.exports = {

    target: "node",

    mode: "production",
    
    entry: {
        vendor: [
            "@material-ui/core",
            "@material-ui/icons",
            "electron", 
            "html2canvas", 
            "img-clipboard", 
            "lodash", 
            "react", 
            "react-dom",
            "react-image-crop",
            "sax"
        ]
    },

    output: {
        filename: "vendor.js",
        path: path.join(__dirname, "build"),
        library: "vendorlib"
    },

    plugins: [
        new DllPlugin({
            name: "vendorlib",
            path: path.join(__dirname, "dist", "build", "vendor-manifest.json")
        })
    ]
};
