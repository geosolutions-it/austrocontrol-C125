const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;
module.exports = require('./MapStore2/build/buildConfig')(
    {
        'austrocontrol-ms2': path.join(__dirname, "js", "app"),
        'embedded': path.join(__dirname, "js", "embedded")
    },
    themeEntries,
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    [extractThemesPlugin, moduleFederationPlugin],
    true,
    "austrocontrol-ms2/dist/",
    '.austrocontrol-ms2',
    [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['embedded'],
            inject: true,
            hash: true,
            filename: 'embedded.html'
        })
    ],
    {
        '@mapstore': path.resolve(__dirname, 'MapStore2/web/client'),
        '@js': path.resolve(__dirname, 'js')
    }
);
