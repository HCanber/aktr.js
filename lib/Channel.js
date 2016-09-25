'use strict'

class Channel {
  put(msg, timeout) { throw new Error('put has not been overridden by implementor') }
  take(timeout) { throw new Error('take has not been overridden by implementor') }
}


module.exports = Channel
