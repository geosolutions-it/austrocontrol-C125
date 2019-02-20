/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const Rx = require('rxjs');
const {ADD_ANNOTATION} = require('../actions/measurement');
const {getStartEndPointsForLinestring, DEFAULT_ANNOTATIONS_STYLES, STYLE_TEXT} = require('../../MapStore2/web/client/utils/AnnotationsUtils');
const {convertUom, getFormattedBearingValue} = require('../../MapStore2/web/client/utils/MeasureUtils');
const LocaleUtils = require('../../MapStore2/web/client/utils/LocaleUtils');
const {addLayer, updateNode} = require('../../MapStore2/web/client/actions/layers');
const {toggleControl} = require('../../MapStore2/web/client/actions/controls');

const uuidv1 = require('uuid/v1');
const assign = require('object-assign');
const {head, last, round} = require('lodash');
const {annotationsLayerSelector} = require('../../MapStore2/web/client/selectors/annotations');
const {editAnnotation} = require('../../MapStore2/web/client/actions/annotations');

const formattedValue = (uom, value) => ({
    "length": round(convertUom(value, "m", uom) || 0, 2) + " " + uom,
    "area": round(convertUom(value, "sqm", uom) || 0, 2) + " " + uom,
    "bearing": getFormattedBearingValue(round(value || 0, 6)).toString()
});
const convertMeasureToGeoJSON = (measureGeometry, value, uom, id, measureTool, state) => {
    const title = LocaleUtils.getMessageById(state.locale.messages, "measureComponent.newMeasure");
    return assign({}, {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: measureGeometry.type === "LineString" ? last(measureGeometry.coordinates) : last(measureGeometry.coordinates[0])
                },
                properties: {
                    valueText: formattedValue(uom, value)[measureTool],
                    isText: true,
                    isValidFeature: true,
                    id: uuidv1()
                },
                style: [{
                    ...STYLE_TEXT,
                    id: uuidv1(),
                    filtering: true,
                    title: "Text Style",
                    type: "Text"
                }]
            },
            {
                type: "Feature",
                geometry: measureGeometry,
                properties: {
                    isValidFeature: true,
                    id: uuidv1()
                },
                style: [{
                    ...DEFAULT_ANNOTATIONS_STYLES[measureGeometry.type],
                    type: measureGeometry.type,
                    id: uuidv1(),
                    title: `${measureGeometry.type} Style`,
                    filtering: true
                }].concat(measureGeometry.type === "LineString" ? getStartEndPointsForLinestring() : [])
            }
        ],
        properties: {
            id,
            title,
            description: " " + formattedValue(uom, value)[measureTool]
        },
        style: {}
    });
};

module.exports = (viewer) => ({
    addAnnotationFromMeasureEpic: (action$, store) =>
        action$.ofType(ADD_ANNOTATION)
        .switchMap((a) => {
            const state = store.getState();
            // transform measure feature into geometry collection
            // add feature property to manage text annotation with value and uom
            const {feature, value, uom, measureTool} = a;
            const id = uuidv1();
            const newFeature = convertMeasureToGeoJSON(feature.geometry, value, uom, id, measureTool, state);
            const annotationsLayer = head(state.layers.flat.filter(l => l.id === 'annotations'));

            // if layers doesn not exist add it
            // if layers exist add only the feature to existing features
            return Rx.Observable.from((annotationsLayer ? [
                updateNode('annotations', 'layer', {
                features: annotationsLayerSelector(state).features.concat([newFeature])
            }), editAnnotation(id)] : [
                addLayer({
                    type: 'vector',
                    visibility: true,
                    id: 'annotations',
                    name: "Annotations",
                    rowViewer: viewer,
                    hideLoading: true,
                    style: null,
                    features: [newFeature],
                    handleClickOnLayer: true
                }),
                editAnnotation(id)
            ])).startWith(toggleControl("annotations"));
        })
});
