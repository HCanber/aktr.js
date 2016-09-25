'use strict'

const csp = require('./csp')


function startCspTask(fn, ...args) {
  const channel = csp.go(fn, args)
  return {
    awaitTermination() { return csp.take(channel) },
    get isRunning() { return !channel.closed }
  }
}

function cspSleep(milliseconds) {
  return csp.timeout(milliseconds)
}

module.exports = {
  startTask: startCspTask,
  sleep: cspSleep
}
