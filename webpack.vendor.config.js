const { DllPlugin, CleanPlugin } = require("webpack");
const path = require("path");

module.exports = {

    target: "node",

    mode: "production",

    resolve: {
        extensions: [".js"]
    },
    
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
        path: path.join(__dirname, "build"),
        filename: "vendor.js",
        library: "vendorlib"
    },

    plugins: [
        
        new DllPlugin({
            name: "vendorlib",
            path: path.join(__dirname, "build", "manifest.json")
        })
    ]
};
