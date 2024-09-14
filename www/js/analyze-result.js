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


document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {

    console.log('AnalyzeResultScreen');

    await SetAnalyzeConfig();

    try {
        var analyzeData = await DocutainSDKPromisify.analyze();
        if (analyzeData.length == 0) {
            console.info("analyze not data read");
            return;
        }
    }
    catch (err) {
        await DocutainError("analyze", err);
    }

    const dataObject = JSON.parse(analyzeData);

    if (dataObject.Address.Bank) {
        console.log('AnalyzeResultScreen bank: ' + dataObject.Address.Bank)

        //TODO: handle multiple bank accounts. In the example we only use the first one
        if (dataObject.Address.Bank.length > 0) {
            setValue("iban", dataObject.Address.Bank[0].IBAN);
            setValue("bic", dataObject.Address.Bank[0].BIC);
        }
    }

    setValue("Name1", dataObject.Address.Name1);
    setValue("Name2", dataObject.Address.Name2);
    setValue("Name3", dataObject.Address.Name2);
    setValue("Zipcode", dataObject.Address.Zipcode);
    setValue("City", dataObject.Address.City);
    setValue("Street", dataObject.Address.Street);
    setValue("Phone", dataObject.Address.Phone);
    setValue("CustomerID", dataObject.Address.CustomerId);
    setValue("Date", dataObject.Date);
    setValue("Amount", dataObject.Amount);
    setValue("InvoiceID", dataObject.InvoiceId);
    setValue("Reference", dataObject.Reference);
    setValue("PaymentState", dataObject.PaymentState);

}

async function SetAnalyzeConfig() {
    console.log("setAnalyzeConfiguration");

    const config = {
        readBIC: true,
        readPaymentState: true
    };

    try {
        await DocutainSDKPromisify.setAnalyzeConfiguration(config);
    } catch (ex) {
        await DocutainError("setAnalyzeConfiguration", err);
    }
};


function setValue(id, value) {
    document.getElementById(id).value = value;
}