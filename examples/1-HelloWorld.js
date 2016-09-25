'use strict'
/* eslint no-console: off */
const {ActorSystem} = require('..')

// const actorSystem = new ActorSystem({ log: { actorLoop: true } })
const actorSystem = new ActorSystem()
const {startTask, sleep} = actorSystem.settings.system.scheduler


var actor = actorSystem.createActor({receive})

function* receive({message}) {
  console.log(`Actor: Received "${message}"`)
  yield sleep(300)
  console.log('Actor: sleeping')
  yield sleep(500)
  console.log(`Actor: Done with "${message}"`)
}

startTask(function* () {
  yield actor.send('Hello')
  console.log('    "Hello" sent')
  yield actor.send('World')
  console.log('    "World" sent')
  console.log('     Terminating in 3s')
  yield sleep(1000)
  console.log('     Terminating in 2s')
  yield sleep(1000)
  console.log('     Terminating in 1s')
  yield sleep(1000)
})
