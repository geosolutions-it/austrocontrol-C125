/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { compose, withState, withHandlers, withPropsOnChange } = require('recompose');


module.exports = compose(
    withState('expanded', 'setExpanded', true),
    withPropsOnChange(['date'], ({ date }) => ({
        date: date ? new Date(date) : undefined
    })),
    withHandlers({
        onSetDate: ({ onSetDate = () => { } }) => date => onSetDate((date && date.toISOString) ? date.toISOString() : undefined)
    }),
    require('./utcDateWrapper')
);
