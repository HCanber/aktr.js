'use strict'

function _deepDefaults(target, obj) {
  const props = Reflect.ownKeys(obj)
    .map(key => ({ key, descriptor: Object.getOwnPropertyDescriptor(obj, key) }))
    .filter(prop => prop.descriptor.enumerable)

  for (const prop of props) {
    const key = prop.key
    const existingValue = target[key]
    if (typeof existingValue === 'undefined') {
      Object.defineProperty(target, key, prop.descriptor)
    } else {
      const oValue = prop.descriptor.value
      if (existingValue != null && typeof existingValue === 'object' && typeof oValue === 'object') {
        _deepDefaults(existingValue, oValue)
      }
    }
  }
}

function deepDefaults(target, ...objects) {
  if (!target) return target
  if (typeof target !== 'object') return target
  for (const o of objects) {
    _deepDefaults(target, o)
  }
  return target
}

module.exports = deepDefaults
