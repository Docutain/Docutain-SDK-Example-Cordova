const TestImage1 = 'file:///storage/emulated/0/Download/TestImage1.jpg';

async function unittestLoadTrace() {
    console.log('getTraceFile');
    var tracePath = await DocutainSDK.getTraceFile();
    cordova.plugins.fileOpener2.open(
        tracePath,
        'text/plain',
        {
            error: function (e) {
                console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
            },
            success: function () {
                console.log('File opened successfully');
                try {
                    DocutainSDK.deleteTempFiles({ deleteTraceFileContent: true });
                }
                catch (err) {
                    console.error(err);
                }
            }
    });
};

function checkPermissionErrorCallback(status) {
    console.log('checking permissions')
    console.log(status)
}

async function requestFilePermision() { 
    let permissions = cordova.plugins.permissions
    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
        console.log('checking permissions')
        console.log(status)
        if (!status.hasPermission) {
          var errorCallback = function () {
            console.warn('Storage permission is not turned on')
          }
          // Asking permission to the user
          permissions.requestPermission(
            permissions.WRITE_EXTERNAL_STORAGE,
            function (status) {
              if (!status.hasPermission) {
                alert("requestFilePermision not granted");
              } else {
                console.warn('Storage permission granted')
              }
            },
            function (status) {alert("requestFilePermision failed: " + status); }
            )
        } else {
            console.warn('Storage permission was pervious granted')
        }},
    checkPermissionErrorCallback)
}


async function CopyTraceFile() { 
    console.log(' unittest CopyTraceFile');
    await requestFilePermision() 
    filePathTrace = 'Docutain/Docutain.txt';
    await this.CopyDataToDownload(filePathTrace, 'Docutain.txt');
}

async function unittestStartUnitest() { 
    console.log(' unittestStartUnitest');v
    await requestFilePermision() 

    // sollte nur den Pfad ab Files zur�ck geben
    filePathTrace = 'Docutain/Docutain.txt';
    try {
        await DocutainSDK.deleteTempFiles(true);
    }
    catch (err) {
        console.error(err);
    }
    var rc = await DocutainSDK.loadFile(TestImage1);
    console.log('loadFile:' + rc);
    var Text = await DocutainSDK.getText();
    console.log('getText:' + Text.text);
    var TextPage1 = await DocutainSDK.getTextPage({ pageNumber: 1 });
    console.log('getTextPage1:' + TextPage1.text);
    await this.CopyDataToDownload(filePathTrace, 'Trace1.txt');
    var analyze1 = await DocutainSDK.Analyze();
    await this.CopyDataToDownload(filePathTrace, 'Trace2.txt');
    rc2 = await this.CopyDataToDownload(filePathTrace, 'Trace3.txt');
};

function copyFile(baseFileURI, destPathName, fileSystem) {
    window.resolveLocalFileSystemURL(baseFileURI,
        function (file) {
            window.requestFileSystem(fileSystem, 0,
                function (fileSystem) {
                    var documentsPath = fileSystem.root;
                    console.log(documentsPath);
                    file.copyTo(documentsPath, destPathName,
                        function (res) {
                            console.log('copying was successful to: ' + res.nativeURL)
                        },
                        function () {
                            console.log('unsuccessful copying')
                        });
                });
        },
        function () {
            console.log('failure! file was not found')
        });
}

function errorCallback(status) {
    console.error('checking permissions errorCallback')
    console.log(status)
  }

  function writeFile(fileEntry, dataObj) {
        fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
//            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };
        fileWriter.write(dataObj);
    });
}

function createFile(destFilePath, fileName, data) {
    window.resolveLocalFileSystemURL(destFilePath, function(dir) {
        dir.getFile(fileName, {create:true}, function(fileEntry) {
            writeFile(fileEntry, data);

        },  function(er){
            alert("createFile fail: "+er.code);
            console.log(er);
            });
    });
}

async function CopyDataToDownload(srcPath, destFile) {

    try{
        let destFilePath = cordova.file.externalRootDirectory + 'download';
        let srcFilePath = 'file://'+srcPath;

        window.resolveLocalFileSystemURL(srcFilePath, function(entry) {
            window.resolveLocalFileSystemURL(destFilePath, function(dir) {
                entry.copyTo(dir,destFile,function(e){
                },function(er){
                console.log("CopyDataToDownload failed: "+ er.code);
            });

// Copy by read & write
//            entry.file(function (file) {
//                var reader = new FileReader();
        
//                reader.onloadend = function() {
//                    createFile(destFilePath,destFile,this.result)
//                };
        
//                reader.readAsText(file);
    
        }, function(er){
           console.log("CopyDataToDownload resolve fail: "+er.code);
           });

        },errorCallback);    

    }
    catch(e)
    {
        console.error('CopyDataToDownload failed ' +e )
    }
};
