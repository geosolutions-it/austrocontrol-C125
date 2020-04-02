/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const assign = require('object-assign');
const {connect} = require('react-redux');
const {compose, branch, renderNothing} = require('recompose');
const {createSelector} = require('reselect');

const {setDate, toggleLayerVisibility} = require('../actions/dateFilter');
const { getEffectiveDates, getDate, showDateFilter, getHideLayers } = require('../selectors/dateFilter');
const { mapLayoutValuesSelector } = require('../../MapStore2/web/client/selectors/maplayout');


const enhanceDateFilter = require('../components/timeFilter/enhancers/dateFilter');

/**
 * Floating widget that allows to filter layers selecting a date. Many of the settings can be set
 * in the initial state of the component.
 * @name DateFilter
 * @memberof plugins
 * @prop cfg.showLayerVisibilityToggle hides / shows layer visibility toggle button.
 */
const DateFilterPlugin = compose(
    connect(
        createSelector(
            (state) => mapLayoutValuesSelector(state, { left: true }),
            getEffectiveDates,
            getDate,
            showDateFilter,
            getHideLayers,
            ({ left = 0 }, effectiveDates, date, show, hideLayers) => ({
                effectiveDates,
                date,
                show,
                hideLayers,
                style: {
                    transition: "margin 0.3s ease-out",
                    marginLeft: (left || 50) + 5
                }
            })
        ),
        {
            onSetDate: setDate,
            onToggleFilter: toggleLayerVisibility
        }
    ),
    branch(
        ({ show }) => !show,
        renderNothing
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
