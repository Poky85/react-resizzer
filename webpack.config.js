const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        simple: path.join(__dirname, "./examples/simple/src/index.js"),
    },

    output: {
        path: path.resolve(__dirname, "dist/examples"),
        filename: "[name].js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./examples/simple/src/index.html",
            filename: "./index.html",
        }),
    ],

    devServer: {
        compress: true,
        port: 3010,
    },
};
