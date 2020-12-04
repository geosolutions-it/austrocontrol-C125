/**
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default {
    plugins: {
        // framework plugins
        DetailsPlugin: require('../MapStore2/web/client/plugins/Details').default,
        DrawerMenuPlugin: require('../MapStore2/web/client/plugins/DrawerMenu').default,
        FeedbackMaskPlugin: require('../MapStore2/web/client/plugins/FeedbackMask').default,
        GoFullPlugin: require('../MapStore2/web/client/plugins/GoFull').default,
        IdentifyPlugin: require('../MapStore2/web/client/plugins/Identify').default,
        LocatePlugin: require('../MapStore2/web/client/plugins/Locate').default,
        MapFooterPlugin: require('../MapStore2/web/client/plugins/MapFooter').default,
        MapLoadingPlugin: require('../MapStore2/web/client/plugins/MapLoading').default,
        MapPlugin: require('../MapStore2/web/client/plugins/Map').default,
        OmniBarPlugin: require('../MapStore2/web/client/plugins/OmniBar').default,
        SearchPlugin: require('../MapStore2/web/client/plugins/Search').default,
        TOCPlugin: require('../MapStore2/web/client/plugins/TOC').default,
        ToolbarPlugin: require('../MapStore2/web/client/plugins/Toolbar').default,
        ZoomAllPlugin: require('../MapStore2/web/client/plugins/ZoomAll').default
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,

        SwipeHeader: require('../MapStore2/web/client/components/data/identify/SwipeHeader').default
    }
};
