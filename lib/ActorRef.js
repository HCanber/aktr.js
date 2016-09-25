'use strict'

class ActorRef {
  constructor(channel) {
    this._channel = channel
  }

  send(message, value) {
    return this._channel.put({ message, value })
  }
}

module.exports = { ActorRef }
