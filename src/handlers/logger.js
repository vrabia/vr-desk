const fs = require("fs");
const logFilePath = 'logs.txt';
const logFormat = (message) => `${new Date().toISOString()} ${message}\n`;

function logToFile(message) {
  fs.appendFile(logFilePath, logFormat(message), (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
}

module.exports = { logToFile };
