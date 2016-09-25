'use strict'

const should = require('should') //eslint-disable-line no-unused-vars
///Users/2921/code/privat/aktrjs/lib/misc/deepDefaults.js
///Users/2921/code/privat/aktrjs/test/deepDefaults.test.js
const deepDefaults = require('../lib/misc/deepDefaults.js')

describe('deepDefaults', () => {

  function test(target, ...objects) {
    const expected = objects.pop()
    should(deepDefaults(target, ...objects)).eql(expected)
    should(target).eql(expected)
  }
  it('returns target for target=undefined', () => test(undefined, { foo: 'bar' }, undefined))
  it('returns target for target=null', () => test(null, { foo: 'bar' }, null))
  it('returns target for target=non-object', () => test('hello', { foo: 'bar' }, 'hello'))
  it('assign non existing level 1 properties', () => test({}, { foo: 'non-existing' }, { foo: 'non-existing' }))
  it('assign non existing level 1 properties that are undefined', () => test({ foo: undefined }, { foo: 'new' }, { foo: 'new' }))
  it('does not overwrite existing level 1 properties', () => test({ existing: 'old' }, { existing: 'new' }, { existing: 'old' }))
  it('does not overwrite existing level 1 properties that are null', () => test({ existing: null }, { existing: 'new' }, { existing: null }))
  it('merges non existing level 2 properties', () => test({ existing: {} }, { existing: { nonExisting: true } }, { existing: { nonExisting: true } }))
  it('merges  existing level 2 properties that are undefined', () => test({ existing: { existing2: undefined } }, { existing: { existing2: true } }, { existing: { existing2: true } }))
  it('does not overwrite existing level 2 properties', () => test({ existing: { existing2: 'old' } }, { existing: { existing2: 'new' } }, { existing: { existing2: 'old' } }))

})

