/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {get} = require('lodash');
const { getLayersWithDimension } = require('../../MapStore2/web/client/selectors/layers');
const getDimensionName = state => get(state, "dateFilter.dimensionName") || "time";

module.exports = ({
    getEffectiveDates: state => get(state, "dateFilter.effectiveDates"),
    getEffectiveDatesURL: state => get(state, "dateFilter.effectiveDatesURL"),
    getDate: state => get(state, "dateFilter.date"),
    getDimensionName: state => get(state, "dateFilter.dimensionName") || "time",
    getHideLayers: state => get(state, "dateFilter.hideLayers") || false,
    showDateFilter: state => get(state, "dateFilter.alwaysVisible") || getLayersWithDimension(state, getDimensionName(state)).length > 0
});
