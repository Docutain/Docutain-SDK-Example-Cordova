/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


const DefaultBooleanSettings = [
    { id: 'AllowCaptureModeSetting', value: false },
    { id: 'AutoCapture', value: true },
    { id: 'AutoCrop', value: true },
    { id: 'MultiPage', value: true },
    { id: 'PreCaptureFocus', value: true },
    { id: 'AllowPageFilter', value: true },
    { id: 'AllowPageRotation', value: true },
    { id: 'AllowPageArrangement', value: true },
    { id: 'AllowPageCropping', value: false },
    { id: 'PageArrangementShowDeleteButton', value: false },
    { id: 'PageArrangementShowPageNumber', value: true }
];

const ScanFilterSettings = [
    { id: 'Auto', value: 'AUTO' },
    { id: 'Gray', value: 'GRAY' },
    { id: 'Black & White', value: 'BLACKWHITE' },
    { id: 'Original', value: 'ORIGINAL' },
    { id: 'Text', value: 'TEXT' },
    { id: 'Auto 2', value: 'AUTO2' },
    { id: 'Illustration', value: 'ILLUSTRATION' }
];

const DefaultColorSettings = [
    { id: 'ColorPrimary', value1: '#4CAF50', value2: '#4CAF50' },
    { id: 'ColorSecondary', value1: '#4CAF50', value2: '#4CAF50' },
    { id: 'ColorOnSecondary', value1: '#FFFFFF', value2: '#000000' },
    { id: 'ColorScanButtonsLayoutBackground', value1: '#121212', value2: '#121212' },
    { id: 'ColorScanButtonsForeground', value1: '#FFFFFF', value2: '#FFFFFF' },
    { id: 'ColorScanPolygon', value1: '#4CAF50', value2: '#4CAF50' },
    { id: 'ColorBottomBarBackground', value1: '#FFFFFF', value2: '#212121' },
    { id: 'ColorBottomBarForeground', value1: '#010607', value2: '#BEBEBE' },
    { id: 'ColorTopBarBackground', value1: '#4CAF50', value2: '#2A2A2A' },
    { id: 'ColorTopBarForeground', value1: '#FFFFFF', value2: '#E3E3E3' },
];

function setConfig(id, value) {
    window.localStorage.setItem(id, value);
}

function getBooleanConfig(id) {
    var value = window.localStorage.getItem(id);
    if (value == null)
        value = DefaultBooleanSettings.find((e) => e.id == id).value;
    else
        value = value === 'true';
    return value;
}

function getColorConfig(id) {
    var value = window.localStorage.getItem(id);
    if (value == null) {
        const Parts = id.split("_");
        let idOnly = Parts[0];
        if (id.endsWith("_Light"))
            value = DefaultColorSettings.find((e) => e.id == idOnly).value1;
        else
            value = DefaultColorSettings.find((e) => e.id == idOnly).value2;
    }
    return value;
}

function getScanFilterConfig() {
    var item = window.localStorage.getItem('ScanFilter');
    if (item == null)
        item = 'ILLUSTRATION';
    return item;
}

function resetConfig() {
    for (let i = 0; i < DefaultBooleanSettings.length; i++) {
        var item = DefaultBooleanSettings[i];
        window.localStorage.setItem(item.id, item.value);
    }

    for (let i = 0; i < DefaultColorSettings.length; i++) {
        var item = DefaultColorSettings[i];
        window.localStorage.setItem(item.id + "_Light", item.value1);
        window.localStorage.setItem(item.id + "_Dark", item.value2);
    }

    window.localStorage.setItem('ScanFilter', 'ILLUSTRATION');
}