/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SET_EFFECTIVE_DATES = "DATEFILTER:SET_EFFECTIVE_DATES";
const setEffectiveDates = (dates) => ({type: SET_EFFECTIVE_DATES, dates});
module.exports = {
    SET_EFFECTIVE_DATES,
    setEffectiveDates
};
