/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { set } = require('../../MapStore2/web/client/utils/ImmutableUtils');
const { SET_EFFECTIVE_DATES, SET_DATE} = require('../actions/dateFilter');

module.exports = ( state = {
    effectiveDatesURL: "assets/config/effectiveDates.json"
}, action ) => {
    switch (action.type) {
        case SET_EFFECTIVE_DATES:
            return set( "effectiveDates", action.dates, state);
        case SET_DATE:
            return set("date", action.date, state);
        default:
            return state;
    }
};
