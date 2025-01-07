const { v4: uuidv4 } = require('uuid');

let logs = []

let currentLog = [];
let id; 
function log(message){
  currentLog.push(message);
}
function startLog(){
  id = uuidv4();
  currentLog = [];
}
function endLog(){
  logs.push({
    id,
    log: currentLog
  });
  currentLog = [];
}


module.exports = {
  log,
  startLog,
  endLog
}