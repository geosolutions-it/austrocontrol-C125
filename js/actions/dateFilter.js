/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const SET_EFFECTIVE_DATES = "DATE_FILTER:SET_EFFECTIVE_DATES";
export const SET_DATE = "DATE_FILTER:SET_DATE";
export const TOGGLE_LAYER_VISIBILITY = "DATE_FILTER:TOGGLE_LAYER_VISIBILITY";

export const setEffectiveDates = dates => ({type: SET_EFFECTIVE_DATES, dates});
export const setDate = date => ({ type: SET_DATE, date });
export const toggleLayerVisibility = hide => ({ type: TOGGLE_LAYER_VISIBILITY, hide});
