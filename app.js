const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const { considerSettingUpAutocompletion } = require("@angular/cli/src/utilities/completion");
let appWindow;
const { setHandlers } = require("./src/ipcHandlers/event-handlers");

function initWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true
    }
  });

  // appWindow.loadFile('dist/index.html');
  appWindow.loadURL('http://localhost:4200');
  appWindow.webContents.openDevTools();
  appWindow.on('closed', function () {
    appWindow = null
  });

  setHandlers(appWindow);
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
} catch (_) {
}
