'use strict'

function mustBeDefined(name) {
  throw new Error(`${name} must be defined`)
}

module.exports = {
  mustBeDefined
}
