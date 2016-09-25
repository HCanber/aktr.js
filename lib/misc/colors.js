'use strict'

// Inspired by https://github.com/Marak/colors.js/blob/master/lib/styles.js

const settings = {
  bold: [1, 22],
  dim: [2, 22],
  grey: [90, 39]
}

const colors = {}

for (const name in settings) {
  const [start, end] = settings[name]
  colors[name] = s => `\u001b[${start}m${s}\u001b[${end}m`
}
module.exports = colors
