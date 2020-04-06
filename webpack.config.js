const path = require('path');
const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const assign = require('object-assign');

module.exports = assign({}, require('./MapStore2/build/buildConfig')(
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
    '.austrocontrol-ms2',
    null,
    {
        '@mapstore': path.resolve(__dirname, 'MapStore2/web/client'),
        '@js': path.resolve(__dirname, 'js')
    },
    {
        '/rest/geostore': {
            target: "https://austrocontrol.geo-solutions.it/austrocontrol-ms2",
            secure: false
        },
        '/pdf': {
            target: "https://austrocontrol.geo-solutions.it/austrocontrol-ms2",
            secure: false
        },
        '/proxy': {
            target: "https://austrocontrol.geo-solutions.it/austrocontrol-ms2",
            secure: false
        }
    }
));
