/**
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { loadVersion } from '../MapStore2/web/client/actions/version';
import main from '../MapStore2/web/client/product/main';
import { checkForMissingPlugins } from '../MapStore2/web/client/utils/DebugUtils';
import ConfigUtils from '../MapStore2/web/client/utils/ConfigUtils';

import appConfigEmbedded from './appConfigEmbedded';
import apiPlugins from './apiPlugins';

ConfigUtils.setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);
ConfigUtils.setConfigProp('themePrefix', 'austrocontrol-ms2');
ConfigUtils.setLocalConfigurationFile('localConfig.json');

checkForMissingPlugins(apiPlugins.plugins);

main(
    appConfigEmbedded,
    apiPlugins,
    (cfg) => ({
        ...cfg,
        initialActions: [loadVersion]
    })
);
