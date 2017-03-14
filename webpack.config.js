"use strict";
const path = require('path');


module.exports = {

    entry: path.join(__dirname, 'src', 'app', 'ssaApps.ts'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'build'),
        filename: "ssaApps.js"
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", '.jsx']
    },
    externals: {
        "custom-ol": "ol",
        "jquery": "$",
        "c3": "c3",
        "d3": "d3",
        "jquery-ui": "$",
        "react-dom": "ReactDOM",
        "react": "React"
    }
};
