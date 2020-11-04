/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';
import dateFilter from '../dateFilter';
import { setEffectiveDates, setDate, toggleLayerVisibility } from '../../actions/dateFilter';
import { getEffectiveDates, getEffectiveDatesURL, getHideLayers, getDate } from '../../selectors/dateFilter';

describe('dateFilter reducer', () => {
    it('setEffectiveDates sets dates', () => {
        const DATES = [{
            value: '01/04/2018',
            label: '4 Jan 2018',
            code: 'AR 190'
        },
        {
            value: '02/01/2018',
            label: '1 Feb 2018',
            code: 'AR 191'
        },
        {
            value: '03/01/2018',
            label: '1 Mar 2018',
            code: 'AR 192'
        }];
        const action = setEffectiveDates(DATES);
        const state = dateFilter( {}, action);
        expect(state).toExist();
        expect(getEffectiveDates({dateFilter: state})).toBe(DATES);
    });
    it('default value for effectiveDatesURL ', () => {

        const state = dateFilter(undefined, {type: "NOTHING"});
        expect(state).toExist();
        expect(getEffectiveDatesURL({ dateFilter: state })).toBe('assets/config/effectiveDates.json');
    });
    it('dateFilter setDate', () => {
        const action = setDate("2010-01-01T00:00:00.000Z");
        const state = dateFilter( undefined, action);
        expect(state).toExist();
        expect(getDate({dateFilter: state}));
    });
    it('dateFilter toggleLayerVisibility', () => {
        const action = toggleLayerVisibility(true);
        const state = dateFilter(undefined, action);
        expect(state).toExist();
        expect(getHideLayers({ dateFilter: state })).toBe(true);
    });
});
