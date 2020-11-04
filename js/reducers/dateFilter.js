/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { set } from '../../MapStore2/web/client/utils/ImmutableUtils';
import { SET_EFFECTIVE_DATES, SET_DATE, TOGGLE_LAYER_VISIBILITY} from '../actions/dateFilter';

/**
 * Reducer to manage the state of DateFilter plugin.
 * ```
 * effectiveDatesURL: "assets/config/effectiveDates.json" // URL of effectiveDates
 * dimensionName: // if not present, time is used
 * ```
 * @name dateFilter
 * @memberof reducers
 * @param {object} state old state
 * @param {object} action action. Intercepts actions from dateFilter action creators
 */
export default ( state = {
    effectiveDatesURL: "assets/config/effectiveDates.json"
}, action ) => {
    switch (action.type) {
    case SET_EFFECTIVE_DATES:
        return set( "effectiveDates", action.dates, state);
    case SET_DATE:
        return set("date", action.date, state);
    case TOGGLE_LAYER_VISIBILITY:
        return set("hideLayers", action.hide, state);
    default:
        return state;
    }
};
