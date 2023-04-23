const { PythonShell } = require("python-shell");
const { logToFile } = require("./logger");
const shell = require('electron').shell
const { exec } = require("child_process");

function connectToMusicListener() {
  let pyshell = new PythonShell('./pulse-audio-listener.py');

  pyshell.stdout.on('data', function (message) {
    logToFile(message);
    shell.beep()

    setTimeout(() => {
      exec('./playerctl-scripts/find-playing-player.sh', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
         if (stdout) {
           console.log(`stdout: ${stdout}`);
          exec(`./playerctl-scripts/metadata.sh ${stdout}`, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          })
        }

      })
    }, 1000);
  });
  return pyshell;
}

module.exports = { connectToMusicListener };
