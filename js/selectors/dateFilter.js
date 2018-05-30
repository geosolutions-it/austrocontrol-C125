/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {get} = require('lodash');
module.exports = ({
    getEffectiveDates: state => get(state, "dateFilter.effectiveDates"),
    getEffectiveDatesURL: state => get(state, "dateFilter.effectiveDatesURL")
});
