/**
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import {updateMapLayoutEpic} from '../MapStore2/web/client/epics/maplayout';
import {readQueryParamsOnMapEpic} from '../MapStore2/web/client/epics/queryparams';
import maplayout from '../MapStore2/web/client/reducers/maplayout';
import searchconfig from '../MapStore2/web/client/reducers/searchconfig';
import version from '../MapStore2/web/client/reducers/version';
import MapViewer from '../MapStore2/web/client/product/pages/MapViewer';

import apiPlugins from './apiPlugins.js';

export default {
    mode: "embedded",
    pages: [{
        name: "mapviewer",
        path: "/:mapId",
        component: MapViewer
    }],
    pluginsDef: apiPlugins,
    initialState: {
        defaultState: {
            mode: "embedded",
            mousePosition: {enabled: false},
            controls: {
                help: {
                    enabled: false
                },
                print: {
                    enabled: false
                },
                toolbar: {
                    active: null,
                    expanded: false
                },
                drawer: {
                    enabled: false,
                    menu: "1"
                }
            },
            mapInfo: {enabled: true, infoFormat: 'text/html' }
        },
        mobile: {
        }
    },
    baseReducers: {
        mode: (state = 'embedded') => state,
        version,
        maplayout,
        searchconfig
    },
    baseEpics: {
        updateMapLayoutEpic,
        readQueryParamsOnMapEpic
    },
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
