/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {get} from 'lodash';
import { getLayersWithDimension } from '../../MapStore2/web/client/selectors/layers';
export const getDimensionName = state => get(state, "dateFilter.dimensionName") || "time";
export const getEffectiveDates = state => get(state, "dateFilter.effectiveDates");
export const getEffectiveDatesURL = state => get(state, "dateFilter.effectiveDatesURL");
export const getDate = state => get(state, "dateFilter.date");
export const getHideLayers = state => get(state, "dateFilter.hideLayers") || false;
export const showDateFilter = state => get(state, "dateFilter.alwaysVisible") || getLayersWithDimension(state, getDimensionName(state)).length > 0;
