/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import {connect} from '../../MapStore2/web/client/utils/PluginsUtils';
import {Checkbox} from 'react-bootstrap';
import {toggleEmptyMessageGFI} from '../../MapStore2/web/client/actions/mapInfo';
import {showEmptyMessageGFISelector} from '../../MapStore2/web/client/selectors/mapInfo';
import Message from '../../MapStore2/web/client/components/I18N/Message';

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

export default {
    IdentifySettingsPlugin: assign(Empty, {
        Settings: {
            tool: <IdentifySettings key="identify"/>,
            position: 5
        }
    }),
    reducers: {}
};
