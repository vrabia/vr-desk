const { ipcMain, shell } = require("electron");
const Store = require('electron-store');
const store = new Store();
const fs = require('fs');
const { logToFile } = require("./logger");

function setHandlers(mainWindow) {
  ipcMain.on('open-website', (event, url) => {
    shell.openExternal(url);

    // Event emitter for sending asynchronous messages
    // event.sender.send('asynchronous-reply', 'async pong')
  });
  setStoreHandlers(mainWindow);
}

function setStoreHandlers(mainWindow) {
  ipcMain.on('store-set', (event, args) => {
    store.set(args.key, args.value);
  })

  ipcMain.on('store-get', (event, args) => {
    const value = store.get(args.key);
    mainWindow.webContents.send(`get-${args.key}`, { data: value });
  });

  ipcMain.on('store-delete', (event, args) => {
    store.delete(args.key)
  });
}

module.exports = { setHandlers };
