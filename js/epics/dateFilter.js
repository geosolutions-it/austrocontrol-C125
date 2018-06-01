/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
const axios = require('../../MapStore2/web/client/libs/ajax');
const { setEffectiveDates, SET_DATE } = require('../actions/dateFilter');
const { getEffectiveDatesURL } = require('../selectors/dateFilter');
const {error} = require('../../MapStore2/web/client/actions/notifications');
const { updateLayerDimension } = require('../../MapStore2/web/client/actions/layers');


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
            )
};
