/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SET_EFFECTIVE_DATES = "DATE_FILTER:SET_EFFECTIVE_DATES";
const SET_DATE = "DATE_FILTER:SET_DATE";
const TOGGLE_LAYER_VISIBILITY = "DATE_FILTER:TOGGLE_LAYER_VISIBILITY";

const setEffectiveDates = dates => ({type: SET_EFFECTIVE_DATES, dates});
const setDate = date => ({ type: SET_DATE, date });
const toggleLayerVisibility = hide => ({ type: TOGGLE_LAYER_VISIBILITY, hide});
module.exports = {
    SET_EFFECTIVE_DATES,
    setEffectiveDates,
    SET_DATE,
    setDate,
    TOGGLE_LAYER_VISIBILITY,
    toggleLayerVisibility
};
