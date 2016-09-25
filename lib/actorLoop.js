'use strict'

const log = require('./misc/logging').log

function* actorLoop(actorSystem, actor, receive, channelIn) {
  const settings = actorSystem.settings
  log(actorSystem.settings.log.actorLoop, settings.traceLogger, 'actorLoop', 'Started. Waiting for message', { actor: actor.id })
  while (true) { //eslint-disable-line no-constant-condition
    const shouldLog = actorSystem.settings.log.actorLoop
    const msg = yield channelIn.take()
    log(shouldLog, settings.traceLogger, 'actorLoop', 'Received message; dispatching to actor', { actor: actor.id, message: msg })
    var result = receive(msg)
    if (result) yield* result
    log(shouldLog, settings.traceLogger, 'actorLoop', 'Message handled. Waiting for message', { actor: actor.id, message: msg })
  }
}

module.exports = actorLoop
