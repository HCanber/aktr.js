'use strict'

// https://wallabyjs.com/docs/integration/node.html
module.exports = () => ({
  files: [
    'lib/*.js',
    'lib/**/*.js',
    'index.js'
  ],
  tests: [
    'test/**/*.test.js'
  ],
  env: {
    type: 'node'
  },
  debug: true
})
