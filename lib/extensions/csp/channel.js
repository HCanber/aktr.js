'use strict'

const Channel = require('../../Channel')
const csp = require('./csp')
const {mustBeDefined} = require('../../misc/arguments')

class CspChannel extends Channel {
  constructor(cspChannel) {
    super()
    this._cspChannel = cspChannel
  }

  put(msg, timeout) {
    return csp.put(this._cspChannel, msg)
  }

  take(timeout) {
    return csp.take(this._cspChannel)
  }

  close() {
    return this._cspChannel.close()
  }
}

function createChannel({
  buffer: {
    type: bufferType = mustBeDefined('buffer.type'),
    size: bufferSize = mustBeDefined('buffer.size') }
} = {}) {
  let cspChannel
  switch (bufferType) {
    case 'fixed':
      cspChannel = csp.chan(bufferSize)
      break
    case 'sliding':
      cspChannel = csp.chan(csp.buffers.sliding(bufferSize))
      break
    case 'dropping':
      cspChannel = csp.chan(csp.buffers.dropping(bufferSize))
      break
    default:
      throw new Error(`Invalid buffer.type:"${bufferType}"`)
  }

  return new CspChannel(cspChannel)
}

module.exports = {
  CspChannel,
  createChannel
}
