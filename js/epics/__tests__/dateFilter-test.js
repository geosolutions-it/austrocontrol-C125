/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var expect = require('expect');
const { testEpic } = require('../../../MapStore2/web/client/epics/__tests__/epicTestUtils');
const { loadDateFilterEffectiveDates, dateFilterToggleHideLayerVisibility } = require('../dateFilter');
const { SET_EFFECTIVE_DATES, toggleLayerVisibility, TOGGLE_LAYER_VISIBILITY } = require('../../actions/dateFilter');
const {SHOW_NOTIFICATION} = require('../../../MapStore2/web/client/actions/notifications');
const { CHANGE_LAYER_PROPERTIES, changeLayerProperties } = require('../../../MapStore2/web/client/actions/layers');
const { LOCATION_CHANGE } = require('react-router-redux');


const { configureMap} = require('../../../MapStore2/web/client/actions/config');

const STATE_LAYERS = {
    layers: {
        flat: [
            {
                type: 'osm',
                title: 'Open Street Map',
                name: 'mapnik',
                source: 'osm',
                group: 'background',
                visibility: true,
                id: 'mapnik__1',
                loading: false,
                loadingError: false
            },
            {
                type: 'google',
                title: 'Google HYBRID',
                name: 'HYBRID',
                source: 'google',
                group: 'background',
                visibility: false,
                id: 'HYBRID__2'
            },
            {
                type: 'tileprovider',
                title: 'OpenTopoMap',
                provider: 'OpenTopoMap',
                name: 'OpenTopoMap',
                source: 'OpenTopoMap',
                group: 'background',
                visibility: false,
                id: 'OpenTopoMap__4'
            },
            {
                type: 'wms',
                url: 'http://cloudsdi.geo-solutions.it/geoserver/ows',
                name: 'test:flexpart_time_series',
                visibility: true,
                group: 'TEST DATA',
                dimensions: [
                    {
                        values: [
                            '2016-02-23T03:00:00.000Z'

                        ],
                        name: 'time',
                        'default': '2016-02-28T00:00:00Z',
                        units: 'ISO8601'
                    }
                ],
                id: 'test:flexpart_time_series__0',
                loading: false,
                loadingError: false
            },
            {
                id: 'LAYER_TO_HIDE',
                type: 'wms',
                url: 'https://sdigeo-free.austrocontrol.at/geoserver/free/wms',
                visibility: true,
                dimensions: []
            },
            {
                type: 'wms',
                id: 'LAYER_TO_KEEP',
                url: 'https://sdigeo-free.austrocontrol.at/geoserver/free/wms',
                visibility: false,
                dimensions: []
            }
        ],
        groups: [
            {
                id: 'Default',
                title: 'Default',
                name: 'Default',
                nodes: [
                    'SECSI_FRA_ASP__6',
                    'SECSI_CHART_BG__5'
                ],
                expanded: true
            },
            {
                id: 'TEST DATA',
                title: 'TEST DATA',
                name: 'TEST DATA',
                nodes: [
                    'test:flexpart_time_series__0'
                ],
                expanded: true
            }
        ]
    }

};

describe('dateFilter Epics', () => {
    it('load effectiveDate on MAPCONFIG_LOADED', (done) => {
        const checkActions = actions => {
            expect(actions.length).toBe(1);
            const action = actions[0];
            expect(action.type).toBe(SET_EFFECTIVE_DATES);
            done();
        };
        testEpic(loadDateFilterEffectiveDates,
            1,
            [
                configureMap()
            ],
            checkActions,
            {
                dateFilter: { effectiveDatesURL: '/base/js/test-resources/effectiveDates.json'}
            });
    });
    it('load error for effectiveDate on MAPCONFIG_LOADED', (done) => {
        const checkActions = actions => {
            expect(actions.length).toBe(1);
            const action = actions[0];
            expect(action.type).toBe(SHOW_NOTIFICATION);
            expect(action.level).toBe("error");
            expect(action.title).toExist();
            expect(action.message).toExist();
            done();
        };
        testEpic(loadDateFilterEffectiveDates,
            1,
            [
                configureMap()
            ],
            checkActions,
            {
                dateFilter: { effectiveDatesURL: '/base/js/test-resources/NOTHING.json' }
            });
    });
    it('toggleLayerVisibility triggers hide for proper layers', done => {
        testEpic(dateFilterToggleHideLayerVisibility, 1, toggleLayerVisibility(true), (actions) => {
            expect(actions[0].type).toBe(CHANGE_LAYER_PROPERTIES);
            expect(actions[0].layer.length).toBe(1);
            expect(actions[0].layer[0]).toBe('LAYER_TO_HIDE');
            done();
        }, STATE_LAYERS);
    });
    it('toggleLayerVisibility triggers show for proper layers', done => {
        testEpic(dateFilterToggleHideLayerVisibility, 2, [toggleLayerVisibility(true), toggleLayerVisibility(false)], (actions) => {
            expect(actions[0].type).toBe(CHANGE_LAYER_PROPERTIES);
            expect(actions[0].layer.length).toBe(1);
            expect(actions[0].layer[0]).toBe('LAYER_TO_HIDE');
            expect(actions[0].newProperties.visibility).toBe(false);
            expect(actions[1].type).toBe(CHANGE_LAYER_PROPERTIES);
            expect(actions[1].layer.length).toBe(1);
            expect(actions[1].layer[0]).toBe('LAYER_TO_HIDE');
            expect(actions[1].newProperties.visibility).toBe(true);
            done();
        }, STATE_LAYERS);
    });
    it('toggleLayerVisibility resets on location change', done => {
        testEpic(dateFilterToggleHideLayerVisibility, 2, [toggleLayerVisibility(true), { type: LOCATION_CHANGE}], (actions) => {
            expect(actions[0].type).toBe(CHANGE_LAYER_PROPERTIES);
            expect(actions[0].layer.length).toBe(1);
            expect(actions[0].layer[0]).toBe('LAYER_TO_HIDE');
            expect(actions[0].newProperties.visibility).toBe(false);
            expect(actions[1].type).toBe(TOGGLE_LAYER_VISIBILITY);
            expect(actions[1].hide).toBe(false);
            done();
        }, STATE_LAYERS);
    });
    it('toggleLayerVisibility resets on change layer properties for the layers modified', done => {
        testEpic(dateFilterToggleHideLayerVisibility, 2, [toggleLayerVisibility(true), changeLayerProperties('LAYER_TO_HIDE', {visibility: true})], (actions) => {
            expect(actions[0].type).toBe(CHANGE_LAYER_PROPERTIES);
            expect(actions[0].layer.length).toBe(1);
            expect(actions[0].layer[0]).toBe('LAYER_TO_HIDE');
            expect(actions[0].newProperties.visibility).toBe(false);
            expect(actions[1].type).toBe(TOGGLE_LAYER_VISIBILITY);
            expect(actions[1].hide).toBe(false);
            done();
        }, STATE_LAYERS);
    });
});

