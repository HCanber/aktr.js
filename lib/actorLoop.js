'use strict'

const log = require('./misc/logging').log

function* actorLoop(actorSystem, actor, receive, channelIn) {
  const settings = actorSystem.settings
  log(actorSystem.settings.log.actorLoop, settings.traceLogger, 'actorLoop', 'Started. Waiting for message', { actor: actor.id })
  while (true) { //eslint-disable-line no-constant-condition
    const shouldLog = actorSystem.settings.log.actorLoop
    const msg = yield channelIn.take()
    const {message, sender} = msg
    log(shouldLog, settings.traceLogger, 'actorLoop', 'Received message; dispatching to actor', { actor: actor.id, message: msg })
    let shouldStop = false
    const context = { self: actor, stop: () => shouldStop = true }
    var result = receive({ message, sender, context })
    if (result) yield* result
    if (shouldStop) {
      log(shouldLog, settings.traceLogger, 'actorLoop', 'Message handled. Stop requested by actor. Stopping...', { actor: actor.id, message: msg })
      channelIn.close()
      return
    } else
      log(shouldLog, settings.traceLogger, 'actorLoop', 'Message handled. Waiting for message', { actor: actor.id, message: msg })
  }
}

module.exports = actorLoop
