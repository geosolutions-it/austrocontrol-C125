/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const React = require('react');
const assign = require('object-assign');
const PropTypes = require('prop-types');
const {connect} = require('../../MapStore2/web/client/utils/PluginsUtils');
const {Checkbox} = require('react-bootstrap');
const {toggleEmptyMessageGFI} = require('../../MapStore2/web/client/actions/mapInfo');
const {showEmptyMessageGFISelector} = require('../../MapStore2/web/client/selectors/mapInfo');
const Message = require('../../MapStore2/web/client/components/I18N/Message');

/**
  * custom Identify options in Settings Plugin.
  * @class  Identify
  * @memberof plugins
  * @static
  *
  */
const IdentifySettings = connect((state) => ({
    showEmptyMessageGFI: showEmptyMessageGFISelector(state)
}), {
    onToggleEmptyMessageGFI: toggleEmptyMessageGFI
} )(
    class extends React.Component {
    static propTypes = {
        showEmptyMessageGFI: PropTypes.bool,
        onToggleEmptyMessageGFI: PropTypes.func
    };

    static defaultProps = {
        showEmptyMessageGFI: false,
        onToggleEmptyMessageGFI: () => {}
    };

    render() {
        return (
            <span className="application-version-label">
                <Checkbox checked={this.props.showEmptyMessageGFI} onChange={() => {this.props.onToggleEmptyMessageGFI(); }}>
                    <Message msgId="showEmptyMessageGFI"/>
                </Checkbox>
            </span>
        );
    }
    });


class Empty extends React.Component {
    render() {
        return null;
    }
}

module.exports = {
    IdentifySettingsPlugin: assign(Empty, {
        Settings: {
            tool: <IdentifySettings key="identify"/>,
            position: 5
        }
    }),
    reducers: {}
};
