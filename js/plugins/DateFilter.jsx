/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const assign = require('object-assign');
const {createSelector} = require('reselect');
const { mapLayoutValuesSelector } = require('../../MapStore2/web/client/selectors/maplayout');
const { getEffectiveDates } = require('../selectors/dateFilter');

const {connect} = require('react-redux');
const DateFilterPlugin = connect(createSelector(
    (state) => mapLayoutValuesSelector(state, {left: true}),
    getEffectiveDates,
    ({left = 0}, effectiveDates) => ({
        effectiveDates,
        style: {
            transition: "margin 0.3s ease-out",
            marginLeft: (left || 50) + 5
        }
    })
))(require('../components/timeFilter/DateFilter'));

module.exports = {
    DateFilterPlugin: assign(DateFilterPlugin, {
        disablePluginIf: "{state('featuregridmode') === 'EDIT'}",
        FloatingCard: {
            priority: 2,
            name: 'dateFilter'
        }
    }),
    epics: require('../epics/dateFilter'),
    reducers: { dateFilter: require('../reducers/dateFilter')}
};
