'use strict'

const systemSettings = require('./systemSettings')
const ActorRef = require('./ActorRef').ActorRef
const deepFreeze = require('./misc/deepFreeze')
const {mustBeDefined} = require('./misc/arguments')
const actorLoop = require('./actorLoop')

class ActorSystem {
  constructor(settings) {
    this.settings = systemSettings.createSettings(settings)
    deepFreeze(this.settings.system)
  }

  createActor({receive = mustBeDefined('receive'), buffer = 100}={}) {
    const settings = this.settings
    const {createChannel, scheduler: {startTask}} = settings.system
    const bufferType = typeof buffer === 'number' ? { type: 'fixed', size: buffer } : buffer
    const inChannel = createChannel({buffer:bufferType})
    const actor = new ActorRef(inChannel)
    // const csp = require('js-csp')
    // csp.go(actorLoop,[receive,inChannel])
    startTask(actorLoop, this, actor, receive, inChannel)
    return actor
  }
}

module.exports = ActorSystem
