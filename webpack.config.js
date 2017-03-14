"use strict";
const path = require('path');

const appDir = path.join(__dirname, 'dist/app');
const outDir = path.join(__dirname, 'build');

module.exports = {
    entry: path.join(appDir, 'ssaApps.js'),
    devtool: 'source-map',
    output: {
        path: outDir,
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
        "jquery-ui": true,
        "react-dom": "ReactDOM",
        "react": "React"
    }
};
