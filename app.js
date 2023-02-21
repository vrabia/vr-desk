const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let appWindow;

function initWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // nodeIntegration: true
    }
  });

  // appWindow.loadFile('dist/index.html');
  appWindow.loadURL('http://localhost:4200');
  appWindow.webContents.openDevTools();
  appWindow.on('closed', function () {
    appWindow = null
  });
}

app.on('ready', initWindow);
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (appWindow === null) {
    initWindow()
  }
})

try {
  require('electron-reloader')(module)
} catch (_) {}
