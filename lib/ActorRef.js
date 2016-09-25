'use strict'

class ActorRef {
  constructor(channel) {
    this._channel = channel
  }

  send(msg) {
    let message, sender
    if (msg && typeof msg === 'object') {
      ({ message, sender } = msg)
    } else {
      message = msg
    }
    return this._channel.put({ message, sender })
  }
}

module.exports = { ActorRef }
