'use strict'

const csp = require('./csp')


function startCspTask(fn, ...args) {
  csp.go(fn, args)
}

function cspSleep(milliseconds) {
  return csp.timeout(milliseconds)
}

module.exports = {
  startTask: startCspTask,
  sleep: cspSleep
}
