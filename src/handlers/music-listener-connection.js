const { PythonShell } = require("python-shell");
const { logToFile } = require("./logger");
const shell = require('electron').shell
const { exec } = require("child_process");
const { ipcMain } = require("electron");

function connectToMusicListener(mainWindow) {
  logToFile('connecting to music listener')
  let pyshell = new PythonShell('./pulse-audio-listener.py');

  ipcMain.on('music-playing-get', (event, args) => {
    sendToRenderer(mainWindow);
  });


  pyshell.stdout.on('data', function (message) {
    // logToFile(message);
    shell.beep()

    setTimeout(() => {
      sendToRenderer(mainWindow);
    }, 1000);
  });
  return pyshell;
}

function sendToRenderer(mainWindow) {
  logToFile('sending to renderer')
  exec('./playerctl-scripts/find-playing-player.sh', (error, player, stderr) => {
    if (error) {
      logToFile(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      logToFile(`stderr: ${stderr}`);
      return;
    }
    if (player) {
      exec(`./playerctl-scripts/metadata.sh ${player}`, (error, song, stderr) => {
        if (error) {
          logToFile(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          logToFile(`stderr: ${stderr}`);
          return;
        }
        const dataArray = song.split(';');
        const artist = dataArray[0];
        const title = dataArray[1];
        const time = dataArray[2];
        const timeArray = time.split(':');
        logToFile(`time: ${time}`)
        if (timeArray.length === 3) {
          return;
        }
        const minutes = timeArray[0];
        if (Number(minutes) === 0) {
          return;
        }
        if (Number(minutes) >= 10) {
          return;
        }
        logToFile(`passed filtering: ${song}`);
        mainWindow.webContents.send('music-playing', { artist, title, player });
      })
    }
  })
}


module.exports = { connectToMusicListener };
