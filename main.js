'use strict';

const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain;
const PythonShell = require("python-shell");
var fs = require('fs');


let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.openDevTools()
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on("StartScript-One", function (event, arg) {
  console.log("ipc received, starting script...");

  fs.stat('./TestScriptOne.py', function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code == 'ENOENT') {
        // file does not exist
        console.log('file missing');
    } else {
        console.log('Some other error: ', err.code);
    }
  });

  /*
  var python = require('child_process').spawn('python', ['TestScriptOne.py']);
  python.stdout.on('data',function(data){
    console.log("data: ",data.toString('utf8'));
  });
  //*/

  //* needs experimental stuff to be enabled because pyshell uses import instead of require. https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node
  //or maybe pyshell is just broken
  PythonShell.run('./TestScriptOne.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
  //*/
})