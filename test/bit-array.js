'use strict'

const Lab = require('lab')
const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const it = lab.it
const expect = require('code').expect

const BitArray = require('../bit-array')

describe('BitArray', () => {
  describe('constructor', () => {
    it('should create an empty BitArray', (done) => {
      let a = new BitArray()
      expect(a._table.length).to.equal(1)
      expect(a._table[0]).to.equal(0)
      done()
    })
  }) // end 'constructor'

  describe('get', () => {
    var bitArray

    beforeEach((done) => {
      bitArray = new BitArray()
      bitArray._table = [ 0b10101010, 0b11001100 ]
      done()
    })

    it('should get the value at the given bit index', (done) => {
      expect(bitArray.get(0), 'bitArray[0]').to.be.false()
      expect(bitArray.get(1), 'bitArray[1]').to.be.true()
      done()
    })

    it('should return values at any place in the data table', (done) => {
      expect(bitArray.get(54), 'bitArray[54]').to.be.false()
      expect(bitArray.get(55), 'bitArray[55]').to.be.true()
      done()
    })

    it('should return `false` for out-of-bounds indices', (done) => {
      expect(bitArray.get(2003), 'bitArray[2003]').to.be.false()
      done()
    })
  }) // end 'get'

  describe('set', () => {
    var bitArray

    beforeEach((done) => {
      bitArray = new BitArray()
      done()
    })

    it('should set a `true` value for the bit at the given index', (done) => {
      bitArray.set(22, true)
      expect(bitArray.get(22)).to.be.true()
      done()
    })

    it('should set a `false` value for the bit at the given index', (done) => {
      bitArray.set(5, true)
      bitArray.set(5, false)
      expect(bitArray.get(5)).to.be.false()
      done()
    })

    it('should resize the table if the index is out of bounds', (done) => {
      bitArray.set(110, true)
      expect(bitArray._table.length).to.equal(3)
      done()
    })
  }) // end 'set'
}) // end 'Bit Array'
