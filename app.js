const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const { setHandlers } = require("./src/handlers/ipc-event-handlers");
const { connectToMusicListener } = require("./src/handlers/music-listener-connection");
const { logToFile } = require("./src/handlers/logger");

let appWindow;
let pyshell;

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
  pyshell = connectToMusicListener();
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

app.on('quit', function () {
  logToFile('Quitting app')
  pyshell.childProcess.kill('SIGINT');
});

try {
  require('electron-reloader')(module)
} catch (_) {
}
