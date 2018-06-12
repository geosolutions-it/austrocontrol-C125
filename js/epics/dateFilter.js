/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
const { includes, castArray, some } = require('lodash');
const axios = require('../../MapStore2/web/client/libs/ajax');

const { LOCATION_CHANGE } = require('react-router-redux');
const { updateLayerDimension, changeLayerProperties, CHANGE_LAYER_PROPERTIES } = require('../../MapStore2/web/client/actions/layers');
const { setEffectiveDates, SET_DATE, toggleLayerVisibility, TOGGLE_LAYER_VISIBILITY } = require('../actions/dateFilter');
const { error } = require('../../MapStore2/web/client/actions/notifications');

const { getEffectiveDatesURL, getDimensionName } = require('../selectors/dateFilter');
const { layersSelector, getLayersWithDimension, allBackgroundLayerSelector } = require('../../MapStore2/web/client/selectors/layers');


const toTimeInterval = date => date ? `${date.split("T")[0]}T00:00:00.000Z/${date.split("T")[0]}T23:59:59.999Z` : date;
// const toTimeInterval = date => `${date.split("T")[0]}T00:00:00.000Z`;
const { MAP_CONFIG_LOADED } = require('../../MapStore2/web/client/actions/config');
module.exports = {
    loadDateFilterEffectiveDates: (action$, { getState = () => { } } = {}) => action$.ofType(MAP_CONFIG_LOADED)
        .switchMap( () =>
            Rx.Observable.fromPromise(axios.get(getEffectiveDatesURL(getState()))))
                .pluck('data').pluck('effectiveDates')
                .map(dates => setEffectiveDates(dates))
                .catch( () => Rx.Observable.of(error({
                    title: "Error loading calendar dates",
                    message: `Couldn't retrieve dates at ${getEffectiveDatesURL(getState())}`
                }))),
    dateFilterSelectionUpdateLayers: (action$) =>
        action$
            .ofType(SET_DATE)
            .switchMap(({ date }) =>
                Rx.Observable.of(updateLayerDimension('time', toTimeInterval(date)))
            ),
    dateFilterToggleHideLayerVisibility: (action$, { getState = () => { } } = {}) =>
        action$.ofType(TOGGLE_LAYER_VISIBILITY)
            .filter(({ hide }) => hide)
            .switchMap(() => {
                const layersToExclude = [...getLayersWithDimension(getState(), getDimensionName(getState())), ...allBackgroundLayerSelector(getState())];
                const layersToHide = layersSelector(getState())
                    .filter(l => !includes(layersToExclude, l))
                    .filter(l => l.visibility)
                    .map(({ id } = {}) => id);
                return Rx.Observable.race(
                    /**
                     * If the tool is still valid and the visibility has been triggered again,
                     * the layers have to re-set to original visibility
                     */
                    action$.ofType(TOGGLE_LAYER_VISIBILITY)
                        .filter(({ hide }) => !hide).switchMap( () =>
                            Rx.Observable.of(changeLayerProperties(layersToHide, { visibility: true }))
                        ),
                    /* In some case the toggle layer is can not be reverted anymore (i.e. some changes to the layers or location change)
                     * In both case the tool need to be reset, then everything go back to initial state
                     */
                    action$.ofType(CHANGE_LAYER_PROPERTIES).filter(
                        ({ layer, newProperties: props }) => props && props.visibility && some(castArray(layer), l => includes(layersToHide, l))
                    ).map( () => toggleLayerVisibility(false)),
                    action$.ofType(LOCATION_CHANGE).map(() => toggleLayerVisibility(false))

                ).startWith(changeLayerProperties(layersToHide, { visibility: false}));
            })
};
