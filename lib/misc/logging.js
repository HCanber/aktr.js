'use strict'

function log(shouldLog, defaultLogFn, source, message, values) {
  if (shouldLog)
    if (typeof shouldLog === 'function')
      shouldLog(source, message, values)
    else
      defaultLogFn(source, message, values)
}

module.exports = {
  log
}
