/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SET_EFFECTIVE_DATES = "DATEFILTER:SET_EFFECTIVE_DATES";
const SET_DATE = "DATEFILTER:SET_DATE";
const setEffectiveDates = (dates) => ({type: SET_EFFECTIVE_DATES, dates});
const setDate = (date) => ({ type: SET_DATE, date });
module.exports = {
    SET_EFFECTIVE_DATES,
    setEffectiveDates,
    SET_DATE,
    setDate
};
