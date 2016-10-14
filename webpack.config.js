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
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    }
};
