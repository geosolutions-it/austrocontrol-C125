/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import assign from 'object-assign';
import {connect} from 'react-redux';
import {compose, branch, renderNothing} from 'recompose';
import {createSelector} from 'reselect';

import {setDate, toggleLayerVisibility} from '../actions/dateFilter';
import { getEffectiveDates, getDate, showDateFilter, getHideLayers } from '../selectors/dateFilter';
import { mapLayoutValuesSelector } from '../../MapStore2/web/client/selectors/maplayout';

import * as epics from '../epics/dateFilter';
import dateFilter from '../reducers/dateFilter';
import enhanceDateFilter from '../components/timeFilter/enhancers/dateFilter';
import DateFilter from '../components/timeFilter/DateFilter';

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
)(DateFilter);

export default {
    DateFilterPlugin: assign(DateFilterPlugin, {
        disablePluginIf: "{state('featuregridmode') === 'EDIT'}",
        FloatingCard: {
            priority: 2,
            name: 'dateFilter'
        }
    }),
    epics,
    reducers: { dateFilter }
};
