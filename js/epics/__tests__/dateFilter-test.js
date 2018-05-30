/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var expect = require('expect');
const { testEpic } = require('../../../MapStore2/web/client/epics/__tests__/epicTestUtils');
const { loadDateFilterEffectiveDates } = require('../dateFilter');
const { SET_EFFECTIVE_DATES } = require('../../actions/dateFilter');
const {SHOW_NOTIFICATION} = require('../../../MapStore2/web/client/actions/notifications');

const { configureMap} = require('../../../MapStore2/web/client/actions/config');

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
