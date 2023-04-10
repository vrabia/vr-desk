const { ipcMain, shell } = require("electron");
const Store = require('electron-store');
const store = new Store();
const fs = require('fs');
const logFilePath = 'logs.txt';
const logFormat = (message) => `${new Date().toISOString()} ${message}\n`;

function setHandlers (mainWindow) {
  ipcMain.on('open-website', (event, url) => {
    shell.openExternal(url);

    // Event emitter for sending asynchronous messages
    // event.sender.send('asynchronous-reply', 'async pong')
  });
  setStoreHandlers(mainWindow);
}

function setStoreHandlers(mainWindow) {
  ipcMain.on('store-set', (event, args) => {
    logToFile(`Set to store ${args.key}: ${args.value}`);
    store.set(args.key, args.value);
  })

  ipcMain.on('store-get', (event, args) => {
    const value = store.get(args.key);
    logToFile(`Get from store ${args.key}: ${value}`);
    mainWindow.webContents.send(`get-${args.key}`, {data: value});
  });

  ipcMain.on('store-delete', (event, args) => {
    store.delete(args.key)
  });
}

function logToFile(message) {
  fs.appendFile(logFilePath, logFormat(message), (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
}

module.exports = {  setHandlers  };
