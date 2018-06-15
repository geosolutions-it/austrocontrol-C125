/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {connect} = require('react-redux');
const {Glyphicon} = require('react-bootstrap');

const Message = require('../../MapStore2/web/client/plugins/locale/Message');

const assign = require('object-assign');
const {createSelector} = require('reselect');
const {changeMeasurement, changeUom} = require('../../MapStore2/web/client/actions/measurement');
const {addAnnotation} = require('../actions/measurement');
const {toggleControl} = require('../../MapStore2/web/client/actions/controls');
const MeasureDialog = require('../components/MeasureDialog');

const selector = (state) => {
    return {
        measurement: state.measurement || {},
        uom: state.measurement && state.measurement.uom || {
            length: {unit: 'm', label: 'm'},
            area: {unit: 'sqm', label: 'm²'}
        },
        lineMeasureEnabled: state.measurement && state.measurement.lineMeasureEnabled || false,
        areaMeasureEnabled: state.measurement && state.measurement.areaMeasureEnabled || false,
        bearingMeasureEnabled: state.measurement && state.measurement.bearingMeasureEnabled || false
    };
};
const toggleMeasureTool = toggleControl.bind(null, 'measure', null);
/**
 * Measure plugin. Allows to show the tool to measure distances, areas and bearing.
 * it has a custom button to create an annotation from measure feature
 * @class
 * @name Measure
 * @memberof plugins
 * @prop {boolean} showResults shows the measure in the panel itself.
 */
const Measure = connect(
    createSelector([
        selector,
        (state) => state && state.controls && state.controls.measure && state.controls.measure.enabled
    ],
        (measure, show) => ({
            show,
            ...measure
        }
    )),
    {
        toggleMeasure: changeMeasurement,
        onAddAnnotation: addAnnotation,
        onChangeUom: changeUom,
        onClose: toggleMeasureTool
    }, null, {pure: false})(MeasureDialog);


const {cancelRemoveAnnotation, confirmRemoveAnnotation, editAnnotation, removeAnnotation, cancelEditAnnotation,
    saveAnnotation, toggleAdd, validationError, removeAnnotationGeometry, toggleStyle, setStyle, restoreStyle,
    cleanHighlight, cancelCloseAnnotations, confirmCloseAnnotations, startDrawing, changeStyler, setUnsavedChanges,
    toggleUnsavedChangesModal, changedProperties, setUnsavedStyle, toggleUnsavedStyleModal, addText, download,
    changeSelected, resetCoordEditor, changeRadius, changeText, toggleUnsavedGeometryModal, addNewFeature, setInvalidSelected,
    highlightPoint, confirmDeleteFeature, toggleDeleteFtModal, changeFormat
} =
    require('../../MapStore2/web/client/actions/annotations');
const { zoomToExtent } = require('../../MapStore2/web/client/actions/map');
const { annotationsInfoSelector } = require('../../MapStore2/web/client/selectors/annotations');

const commonEditorActions = {
    onEdit: editAnnotation,
    onCancelEdit: cancelEditAnnotation,
    onChangeStyler: changeStyler,
    onChangeFormat: changeFormat,
    onConfirmDeleteFeature: confirmDeleteFeature,
    onCleanHighlight: cleanHighlight,
    onHighlightPoint: highlightPoint,
    onError: validationError,
    onSave: saveAnnotation,
    onRemove: removeAnnotation,
    onAddGeometry: toggleAdd,
    onAddText: addText,
    onSetUnsavedChanges: setUnsavedChanges,
    onSetUnsavedStyle: setUnsavedStyle,
    onChangeProperties: changedProperties,
    onToggleDeleteFtModal: toggleDeleteFtModal,
    onToggleUnsavedChangesModal: toggleUnsavedChangesModal,
    onToggleUnsavedGeometryModal: toggleUnsavedGeometryModal,
    onToggleUnsavedStyleModal: toggleUnsavedStyleModal,
    onAddNewFeature: addNewFeature,
    onResetCoordEditor: resetCoordEditor,
    onStyleGeometry: toggleStyle,
    onCancelStyle: restoreStyle,
    onChangeSelected: changeSelected,
    onSaveStyle: toggleStyle,
    onSetStyle: setStyle,
    onStartDrawing: startDrawing,
    onDeleteGeometry: removeAnnotationGeometry,
    onZoom: zoomToExtent,
    onChangeRadius: changeRadius,
    onSetInvalidSelected: setInvalidSelected,
    onChangeText: changeText,
    onDownload: download
};

const AnnotationsInfoViewer = connect(annotationsInfoSelector,
{
    onCancelRemove: cancelRemoveAnnotation,
    onCancelEdit: cancelEditAnnotation,
    onCancelClose: cancelCloseAnnotations,
    onConfirmClose: confirmCloseAnnotations,
    onConfirmRemove: confirmRemoveAnnotation,
    ...commonEditorActions
})(require('../../MapStore2/web/client/components/mapcontrols/annotations/AnnotationsEditor'));

module.exports = {
    MeasurePlugin: assign(Measure, {
        disablePluginIf: "{state('mapType') === 'cesium'}",
        BurgerMenu: {
            name: 'measurement',
            position: 9,
            panel: false,
            help: <Message msgId="helptexts.measureComponent"/>,
            tooltip: "measureComponent.tooltip",
            text: <Message msgId="measureComponent.Measure"/>,
            icon: <Glyphicon glyph="1-ruler"/>,
            action: toggleMeasureTool
        }
    }),
    reducers: {measurement: require('../../MapStore2/web/client/reducers/measurement')},
    epics: require('../epics/measurement')(AnnotationsInfoViewer)
};
