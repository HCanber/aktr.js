'use strict'

function requireWithMessage(moduleOrPath, errorMessage) {
  try {
    return require(moduleOrPath)
  } catch (error) {
    if (error.message.startsWith('Cannot find module'))
      throw new Error(`${errorMessage}`)
    throw error
  }
}

module.exports = requireWithMessage
