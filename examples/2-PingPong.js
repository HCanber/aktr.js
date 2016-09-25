'use strict'
/* eslint no-console: off */
const {ActorSystem} = require('..')

// const actorSystem = new ActorSystem({ log: { actorLoop: true } })
const actorSystem = new ActorSystem()
const {startTask, sleep} = actorSystem.settings.system.scheduler



const StopMessage = Symbol('Stop')

let messagesLeft = 3
function* pingActor({message, sender, context}) {
  console.log(`Ping Actor: Received "${message}"`)
  yield sleep(300)
  messagesLeft--
  if (messagesLeft)
    yield sender.send({ message: 'Pong', sender: context.self })
  else {
    yield sender.send(StopMessage)
    context.stop()
  }
}

function* pongActor({message, sender, context}) {
  if (message === StopMessage) {
    console.log('Pong Actor: Received "STOP"')
    context.stop()
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
  yield sleep(10000)
})
