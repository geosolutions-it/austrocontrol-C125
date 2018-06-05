const path = require("path");

const themeEntries = require('./MapStore2/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/themes.js').extractThemesPlugin;
const assign = require('object-assign');

module.exports = assign({}, require('./MapStore2/buildConfig')(
    {
        'austrocontrol-ms2': path.join(__dirname, "js", "app")
    },
    themeEntries,
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    extractThemesPlugin,
    false,
    "/dist/",
    '.austrocontrol-ms2'
), {
    devServer: {
        proxy: {
            '/rest/geostore': {
                target: "http://austrocontrol.geo-solutions.it/austrocontrol-ms2"
            },
            '/pdf': {
                target: "http://austrocontrol.geo-solutions.it/austrocontrol-ms2",
                secure: false
            },
            '/austrocontrol-ms2/pdf': {
                target: "http://austrocontrol.geo-solutions.it",
                secure: false
            },
            '/proxy': {
                target: "http://austrocontrol.geo-solutions.it/austrocontrol-ms2"
            },
            '/docs': {
                target: "http://localhost:8081",
                pathRewrite: { '/docs': '/mapstore/docs' }
            }
        }
    }
});
