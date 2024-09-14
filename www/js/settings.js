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

//const { Settings } = require('./settings-config');
/*"use strict";
const settings = new Settings();
*/
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    initUI();
}

function initUI() {

    document.getElementById('Reset').onclick = function (e) { reset(); };

    for (let i = 0; i < DefaultColorSettings.length; i++) {

        var item = DefaultColorSettings[i];
        var colorLight = document.getElementById(item.id + "_Light");
        var colorDark = document.getElementById(item.id + "_Dark");

        colorLight.addEventListener("change", function () { onColor(this); });
        colorLight.value = getColorConfig(item.id + "_Light");

        colorDark.addEventListener("change", function () { onColor(this); });
        colorDark.value = getColorConfig(item.id + "_Dark");
    }

    for (let i = 0; i < DefaultBooleanSettings.length; i++) {

        var itemBoolean = DefaultBooleanSettings[i];
        var checkbox = document.getElementById(itemBoolean.id);
        checkbox.onclick = function (e) { onCheckbox(this); };
        checkbox.checked = getBooleanConfig(itemBoolean.id);
    }

    for (let i = 0; i < ScanFilterSettings.length; i++) {

        var item = ScanFilterSettings[i];
        document.getElementById(item.value).onclick = function (e) { onSelect(this); };
    }

    var scanFilter = document.getElementById('ScanFilter');
    scanFilter.onclick = function (e) { openSelect(); };
    scanFilter.innerHTML = getScanFilterConfig();
}

async function onColor(item) {
    setConfig(item.id, item.value);
}

async function reset() {
    resetConfig();
    initUI();
}

function openSelect() {
    var popup = document.getElementById('popup-scan-filter');
    popup.classList.remove('hide');
    popup.classList.toggle('show');
}

async function onSelect(item) {
    setConfig('ScanFilter', item.id);
    document.getElementById('ScanFilter').innerHTML = ScanFilterSettings.find((e) => e.value == item.id).id;
    var popup = document.getElementById('popup-scan-filter');
    popup.classList.toggle('hide');
    popup.classList.remove('show');
}

async function onCheckbox(checkbox) {
    setConfig(checkbox.id, checkbox.checked);
}