'use strict'
/* eslint no-console: off */
const {ActorSystem} = require('..')

// const actorSystem = new ActorSystem({ log: { actorLoop: true } })
const actorSystem = new ActorSystem()
const {startTask, sleep} = actorSystem.settings.system.scheduler



const StopMessage = Symbol('Stop')

function* pingActor({message, sender, context}) {
  if (message === StopMessage) {
    console.log('Ping Actor: Received "STOP"  Terminating in 1s')
    yield sleep(1000)
    context.stop()
    return
  }
  console.log(`Ping Actor: Received "${message}"`)
  yield sleep(300)
  yield sender.send({ message: 'Pong', sender: context.self })
}

function* pongActor({message, sender, context}) {
  if (message === StopMessage) {
    console.log('Pong Actor: Received "STOP". Terminating in 1s')
    yield sleep(1000)
    context.stop()
    return
  } else {
    console.log(`Pong Actor: Received "${message}"`)
    yield sleep(300)
    yield sender.send({ message: 'Ping', sender: context.self })
  }
}
var ping = actorSystem.createActor({ receive: pingActor })
var pong = actorSystem.createActor({ receive: pongActor })

startTask(function* () {
  yield pong.send({ message: 'Pong', sender: ping })
  yield* actorSystem.awaitTermination()
  console.log('All actors have terminated')
})

startTask(function* () {
  yield sleep(3000)
  console.log('Terminating')
  yield ping.send(StopMessage)
  yield pong.send(StopMessage)
})
