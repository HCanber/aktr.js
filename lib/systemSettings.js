'use strict'

const colors = require('./misc/colors')
const deepFreeze = require('./misc/deepFreeze')
const defaultChannel = require('./extensions/csp/channel').createChannel
const defaultScheduler = require('./extensions/csp/scheduler')
function consoleLogger(color, source, message, values) {
  console.log(`${colors.bold(color(source))}:`, color(message), color(JSON.stringify(values, null, 2))) //eslint-disable-line no-console
}
const defaultTraceLogger = (source, message, values) => consoleLogger(colors.dim, source, message, values)

const defaultSettings = deepFreeze({
  system: {
    createChannel: defaultChannel,
    scheduler: defaultScheduler
  },
  traceLogger: defaultTraceLogger,
  log: {
    actorLoop: false
  }
})

function createSettings(settings) {
  return Object.assign({}, defaultSettings, settings)
}

module.exports = {
  createSettings,
  defaultSettings
}
