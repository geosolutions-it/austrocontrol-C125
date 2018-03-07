/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const ADD_ANNOTATION = 'MEASUREMENT:ADD_ANNOTATION';
function addAnnotation(feature, value, uom, measureTool) {
    return {
        type: ADD_ANNOTATION,
        feature,
        value,
        uom,
        measureTool
    };
}

module.exports = {
    ADD_ANNOTATION, addAnnotation
};
