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
    this._actorsTermination=[]
  }

  createActor({receive = mustBeDefined('receive'), buffer = 100}={}) {
    const settings = this.settings
    const {createChannel, scheduler: {startTask}} = settings.system
    const bufferType = typeof buffer === 'number' ? { type: 'fixed', size: buffer } : buffer
    const inChannel = createChannel({buffer:bufferType})
    const actor = new ActorRef(inChannel)
    // const csp = require('js-csp')
    // csp.go(actorLoop,[receive,inChannel])
    this._actorsTermination.push(startTask(actorLoop, this, actor, receive, inChannel))
    return actor
  }

  * awaitTermination(){
    for(const a of this._actorsTermination){
      yield a.awaitTermination()
    }
  }
}

module.exports = ActorSystem
