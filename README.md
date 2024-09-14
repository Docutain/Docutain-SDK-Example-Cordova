# Docutain SDK

## Docutain SDK example app for Cordova

This example app shows how to integrate the [Docutain SDK for Cordova](https://sdk.Docutain.com).

## What is Docutain SDK?

The [Docutain SDK](https://SDK.docutain.com) is based on the world famous, successful document management app Docutain which is used by millions of users every month. The Docutain SDK makes it possible to integrate a high quality document scanner, text recognition (OCR), document analysis, data extraction and PDF creation functionalities into your apps. It is easy to integrate and works completely offline which ensures 100% data safety.

## Getting started

Clone the repo:

```
git clone https://github.com/Docutain/docutain-sdk-example-cordova
cd docutain-sdk-example-cordova
```

Install the project dependencies:

```
npm install

```

Build on Android

```
cordova platform add android
cordova requirements
cordova build android
```

Run on Android

```
cordova run android --device
```

Build on iOS

```
cordova platform add iOS
cordova requirements
cordova build iOS
```

Run on iOS

```
cd ios
pod install
```

Open the `Docutain_SDK_Example_Cordova.xcworkspace` file from the iOS folder with Xcode.

Set your provisioning and signing settings.

Run the app either in Xcode or via the following command.

```
cordova run iOS --device
```

## Documentation of the Docutain SDK

- [Developer Guide](https://docs.docutain.com/docs/cordova/intro)

## License and Support

The Docutain SDK is a commercial product and requires a paid license for production use. In order to get a trial license, please visit our website via [https://sdk.docutain.com/TrialLicense](https://sdk.docutain.com/TrialLicense?Source=5243146) to generate a trial license key. 

If you need technical support of any kind, please contact us via [support.sdk@Docutain.com](mailto:support.sdk@Docutain.com).





