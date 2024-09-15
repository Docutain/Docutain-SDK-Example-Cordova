/** 
*   Docutain SDK Cordova Plugin Example
*   Copyright (c) 2024 INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
*
*   Docutain SDK Cordova Plugin is a commercial product and requires a license. 
*   Details found in the LICENSE file in the root directory of this source tree.
*/



// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


document.addEventListener('deviceready', onDeviceReady, false);

const License_Key = "<YOUR_LICENSE_KEY_HERE>"

const aSampleMenue = {
  DataExtraction: "DataExtraction",
  ReadOCR: "ReadOCR",
  WritePDF: "WritePDF"
};

const aDocumentSource =
{
  Dokumentscanner: "Dokumentscanner",
  PDFImport: "PDFImport",
  ImageImport: "ImageImport"
};

var sampleMenue = "";
var documentSource = "";
var sourceSampleMenue = "";

async function onDeviceReady() {
  console.log('index.js onDeviceReady start');
  initUI();
  await InitDocutainSDK();
  console.log('index.js onDeviceReady exit');
}

function initUI() {
  console.log('index.js initUI');

  document.getElementById('document-scanner').onclick = function () { onSourceSelected(aDocumentSource.DokumentenscannerCamera); };
  document.getElementById('data-extraction').onclick = function () { openPopupImport(aSampleMenue.DataExtraction); };
  document.getElementById('text-recognition').onclick = function () { openPopupImport(aSampleMenue.ReadOCR); };
  document.getElementById('generate-pdf-document').onclick = function () { openPopupImport(aSampleMenue.WritePDF); };
  document.getElementById('settings').onclick = function () { window.open('settings.html', '_self'); };
  document.getElementById('scan-document-camera').onclick = function () { onSourceSelected(aDocumentSource.DokumentenscannerCamera); };
  document.getElementById('scan-document-gallery').onclick = function () { onSourceSelected(aDocumentSource.DokumentenscannerGallery); };
  document.getElementById('pdf-import').onclick = function () { onSourceSelected(aDocumentSource.PDFImport); };
  document.getElementById('image-import').onclick = function () { onSourceSelected(aDocumentSource.ImageImport); };
}

async function showTrialLicenseAlert() {
  navigator.notification.alert("A valid trial license key is required. You can generate a trial license key for\nde.docutain.sdk_example_cordova\non our website.",
    function () {
      window.open('https://sdk.docutain.com/TrialLicense?Source=5243402', '_self');
      navigator.app.exitApp();
    },
    "License key is required", "GET TRIAL LICENSE");
}

async function InitDocutainSDK() {
  // the Docutain SDK needs to be initialized prior to using any functionality of it
  // a valid license key is required (contact us via [mailto:sdk@Docutain.com] to get a trial license and replace <YOUR_LICENSE_KEY_HERE>

  try {
    await DocutainSDKPromisify.initSDK(License_Key);
  } catch (err) {
    console.log('initSDK Promise ' + License_Key + ' failed: ' + err);
    if (License_Key == "<YOUR_LICENSE_KEY_HERE>") {
      //init of Docutain SDK failed, no trial license provided
      await this.showTrialLicenseAlert();
    } else {
      //init of Docutain SDK failed, get the last error message
      await DocutainError("initSDK", err);
    }
    return false;
  }

  //Depending on your needs, you can set the Logger's level
  DocutainSDKPromisify.setLogLevel("VERBOSE")

  //Depending on the log level that you have set, some temporary files get written on the filesystem
  //You can delete all temporary files by using the following method
  try {
    await DocutainSDKPromisify.deleteTempFiles(true);
  }
  catch (err) {
    await DocutainError("deleteTempFiles", err);
    return false;
  }
  return true;
};

async function openPopupImport(source) {
  sourceSampleMenue = source;

  var popup = document.getElementById('popup-import');
  if (popup != null) {
    popup.classList.toggle('show');
  }
}

function hidePopupImport() {

  var popup = document.getElementById('popup-import');
  if (popup != null) {
    popup.classList.toggle('show');
  }
}

async function onSourceSelected(source) {

  console.log('onSourceSelected ' + source);

  if (source == aDocumentSource.DokumentenscannerCamera || source == aDocumentSource.DokumentenscannerGallery) {

    //define a DocumentScannerConfiguration to alter the scan process  
    const options = {
      //  to load miltiple images from gallery
      //      source: 'GALLERY_MULTIPLE',
      defaultScanFilter: getScanFilterConfig(),
      allowCaptureModeSetting: getBooleanConfig('AllowCaptureModeSetting'),
      autoCapture: getBooleanConfig('AutoCapture'),
      autoCrop: getBooleanConfig('AutoCrop'),
      multiPage: getBooleanConfig('MultiPage'),
      preCaptureFocus: getBooleanConfig('PreCaptureFocus'),
      pageEditConfig: {
        allowPageFilter: getBooleanConfig('AllowPageFilter'),
        allowPageRotation: getBooleanConfig('AllowPageRotation'),
        allowPageArrangement: getBooleanConfig('AllowPageArrangement'),
        allowPageCropping: getBooleanConfig('AllowPageCropping'),
        pageArrangementShowDeleteButton: getBooleanConfig('PageArrangementShowDeleteButton'),
        pageArrangementShowPageNumber: getBooleanConfig('PageArrangementShowPageNumber'),
      },
      ColorConfig: {
        ColorTopBarBackground: {
          Light: getColorConfig('ColorTopBarBackground_Light'),
          Dark: getColorConfig('ColorTopBarBackground_Dark'),
        },
        ColorBottomBarBackground:
        {
          Light: getColorConfig('ColorBottomBarBackground_Light'),
          Dark: getColorConfig('ColorBottomBarBackground_Dark'),
        },
        ColorPrimary: {
          Light: getColorConfig('ColorPrimary_Light'),
          Dark: getColorConfig('ColorPrimary_Dark'),
        },
        ColorSecondary: {
          Light: getColorConfig('ColorSecondary_Light'),
          Dark: getColorConfig('ColorSecondary_Dark'),
        },
        ColorOnSecondary: {
          Light: getColorConfig('ColorOnSecondary_Light'),
          Dark: getColorConfig('ColorOnSecondary_Dark'),
        },
        ColorBottomBarForeground: {
          Light: getColorConfig('ColorBottomBarForeground_Light'),
          Dark: getColorConfig('ColorBottomBarForeground_Dark'),
        },
        ColorScanButtonsForeground: {
          Light: getColorConfig('ColorScanButtonsForeground_Light'),
          Dark: getColorConfig('ColorScanButtonsForeground_Dark'),
        },
        ColorScanButtonsLayoutBackground: {
          Light: getColorConfig('ColorScanButtonsLayoutBackground_Light'),
          Dark: getColorConfig('ColorScanButtonsLayoutBackground_Dark'),
        },
        ColorScanPolygon: {
          Light: getColorConfig('ColorScanPolygon_Light'),
          Dark: getColorConfig('ColorScanPolygon_Dark'),
        },
        ColorTopBarForeground: {
          Light: getColorConfig('ColorTopBarForeground_Light'),
          Dark: getColorConfig('ColorTopBarForeground_Dark'),
        },
      }
    }

    //start the scanner
    try {
      if (source == aDocumentSource.DokumentenscannerGallery)
        options.source = 'GALLERY';

      const result = await DocutainSDKPromisify.scanDocument(options);
      if (result == false) {
        // cancel by user
        return;
      }
    }
    catch (err) {
      await DocutainError("scanDocument", err);
      return;
    }
  }
  else {

    //load a file
    if (!await pickFileLoad(source)) {
      hidePopupImport();
      return;
    }
  }

  hidePopupImport();
  console.log('open site: ' + sourceSampleMenue);
  switch (sourceSampleMenue) {
    case aSampleMenue.DataExtraction:
      // analyze the document and show the result 
      window.open('analyze-result.html', '_self');
      break;
    case aSampleMenue.ReadOCR:
      // read OCR and show the result 
      window.open('text-result.html', '_self');
      break;
    case aSampleMenue.WritePDF:

      //Generate the PDF from the currently loaded document
      //the generated PDF also contains the detected text, making the PDF searchable
      //see [https://docs.docutain.com/docs/react-native/pdfCreation] for more details

      try {
        var resultFilePath = await DocutainSDKPromisify.writePDF('A4');
      }
      catch (err) {
        await DocutainError("writePDF", err);
        break;
      }

      cordova.plugins.fileOpener2.open(
        resultFilePath,
        'application/pdf',
        {
          error: function (e) {
            console.error('Error status: ' + e.status + ' - Error message: ' + e.message);
          },
          success: function () {
            console.log('File opened successfully');
          }
        }
      );
  }
}

async function pickFileLoad(source) {

  try {
    var resultPicker = null;
    if (source == aDocumentSource.ImageImport) {
      resultPicker = await chooser.getFileMetadata('image/jpg,image/jpeg,image/png,image/tif,image/tiff,image/heic');
      console.log(resultPicker);
    }
    else {
      resultPicker = await chooser.getFileMetadata('application/pdf');
      console.log(resultPicker.uri);
    }

    if (resultPicker.uri != null) {
      // Import a PDF or image 
      try {
        await DocutainSDKPromisify.loadFile(resultPicker.uri);
        return true;
      }
      catch (err) {
        await DocutainError("loadFile", err);
      }
    }
    else {
      console.log('pickFileLoad: ' + source);
      return false;
    }
  }
  catch (err) {
    console.log("pickFileLoad Exception: " + err);
    return false;
  }

};