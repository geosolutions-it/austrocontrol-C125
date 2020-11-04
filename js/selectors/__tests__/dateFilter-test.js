/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import expect from 'expect';
import { getDate, getDimensionName, getEffectiveDates, showDateFilter} from '../dateFilter';

describe('dateFilter selectors', () => {
    it('getEffectiveDate, getDimensionName, showDateFilter and getDate', () => {
        const state = {
            dateFilter: {
                effectiveDates: [],
                date: "2016-02-23T03:00:00.000Z"
            }
        };
        expect(getEffectiveDates( state).length).toBe(0);
        expect(getDimensionName(state)).toEqual('time');
        expect(getDate(state)).toEqual("2016-02-23T03:00:00.000Z");
        expect(showDateFilter(state)).toBeFalsy();
    });
    it('showDateFilter', () => {
        const state = {
            dateFilter: {
                effectiveDates: [],
                date: "2016-02-23T03:00:00.000Z"
            },
            layers: {
                flat: [{
                    group: 'test',
                    id: 'layer001',
                    visibility: true,
                    dimensions: [{
                        name: 'time'
                    }]
                },
                {
                    group: 'test',
                    id: 'layer002',
                    visibility: true,
                    dimensions: [{
                        name: 'time'
                    }, {
                        name: 'elevation'
                    }]
                }]
            }
        };
        expect(showDateFilter(state)).toBeTruthy();
        expect(showDateFilter({ dateFilter: {alwaysVisible: true}})).toBeTruthy();
        expect().toBeFalsy();
    });
});
