/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const assign = require('object-assign');
const {compose} = require('recompose');
const {createSelector} = require('reselect');
const { mapLayoutValuesSelector } = require('../../MapStore2/web/client/selectors/maplayout');
const { getEffectiveDates, getDate } = require('../selectors/dateFilter');
const {setDate} = require('../actions/dateFilter');

const {connect} = require('react-redux');

const enhanceDateFilter = require('../components/timeFilter/enhancers/dateFilter');
const DateFilterPlugin = compose(
    connect(
        createSelector(
            (state) => mapLayoutValuesSelector(state, { left: true }),
            getEffectiveDates,
            getDate,
            ({ left = 0 }, effectiveDates, date) => ({
                effectiveDates,
                date,
                style: {
                    transition: "margin 0.3s ease-out",
                    marginLeft: (left || 50) + 5
                }
            })
        ), {
            onSetDate: setDate
        }
    ),
    enhanceDateFilter
)(require('../components/timeFilter/DateFilter'));

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
