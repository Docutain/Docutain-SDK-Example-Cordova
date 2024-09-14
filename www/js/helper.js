/** 
*   Docutain SDK Cordova Plugin Example
*   Copyright (c) 2024 INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
*
*   Docutain SDK Cordova Plugin is a commercial product and requires a license. 
*   Details found in the LICENSE file in the root directory of this source tree.
*/

async function DocutainError(functionName, error) {
    var text = "DOCUTAIN Error\n\n" + functionName +" failed\n\n " + error;
    console.error(text);
    alert(text);
    await CopyTraceFile();
  }
