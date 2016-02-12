'use strict'

const Lab = require('lab')
const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const it = lab.it
const expect = require('code').expect
const sinon = require('sinon')

const BitArray = require('../bit-array')

describe('BitArray', () => {
  var maxBitsPerEntry = BitArray.getMaxBitsPerEntry()

  describe('constructor', () => {
    describe('without data', () => {
      it('should create an empty BitArray', (done) => {
        let a = new BitArray()
        expect(a.table.length).to.equal(0)
        done()
      })
    })

    describe('with data', () => {
      beforeEach((done) => {
        sinon.spy(BitArray.prototype, '_trim')
        done()
      })

      afterEach((done) => {
        BitArray.prototype._trim.restore()
        done()
      })

      it('should create a bit array with the given data', (done) => {
        let data = [1, 2, 4, 8]
        let a = new BitArray(data)
        expect(a.table).to.deep.equal(data)
        done()
      })

      it('should trim the resulting data', (done) => {
        let array = new BitArray([1, 2, 3, 0])
        sinon.assert.calledOnce(BitArray.prototype._trim)
        expect(array.table).to.deep.equal([1, 2, 3])
        done()
      })
    })
  }) // end 'constructor'

  describe('getMaxBitsPerEntry', () => {
    it('should return the correct value', (done) => {
      let expected = Math.log2(Number.MAX_SAFE_INTEGER)
      expect(BitArray.getMaxBitsPerEntry()).to.equal(expected)
      done()
    })
  }) // end 'getMaxBitsPerEntry'

  describe('_getEntry', () => {
    var array

    beforeEach((done) => {
      array = new BitArray([1, 2, 3])
      done()
    })

    it('should return the correct entry for the given bit index', (done) => {
      expect(array._getEntry(0), 'bitIndex=0').to.equal(1)
      expect(
        array._getEntry(maxBitsPerEntry + 1),
        `bitIndex=${maxBitsPerEntry + 1}`
      ).to.equal(2)
      expect(
        array._getEntry(2 * maxBitsPerEntry + 1),
        `bitIndex=${2 * maxBitsPerEntry + 1}`
      ).to.equal(3)
      done()
    })

    it('should return `0` if the bit index is out-of-bounds', (done) => {
      expect(array._getEntry(1000000)).to.equal(0)
      done()
    })
  }) // end '_getEntry'

  describe('_setEntry', () => {
    var array

    beforeEach((done) => {
      array = new BitArray([1, 2, 3])
      done()
    })

    it('should set the correct bit entry', (done) => {
      array._setEntry(0, 456)
      array._setEntry(maxBitsPerEntry + 1, 123)
      array._setEntry(2 * maxBitsPerEntry + 1, 890)
      expect(array.table).to.deep.equal([456, 123, 890])
      done()
    })

    it('should resize the data table if the index is out-of-bounds', (done) => {
      let bitIndex = 5 * maxBitsPerEntry + 1
      array._setEntry(bitIndex, 123456)
      expect(array.table).to.deep.equal([1, 2, 3, 0, 0, 123456])
      done()
    })
  }) // end '_setEntry'

  describe('_getOffset', () => {
    it('should return the correct offset', (done) => {
      let bitIndex = 12304
      expect(new BitArray()._getOffset(bitIndex))
        .to.equal(bitIndex % maxBitsPerEntry)
      done()
    })
  }) // end '_getOffset'

  describe('_trim', () => {
    it('should trim empty trailing data entries', (done) => {
      let array = new BitArray([1, 0, 0, 0, 2, 0, 0, 0, 0, 0])
      array._trim()
      expect(array.table).to.deep.equal([1, 0, 0, 0, 2])
      done()
    })
  }) // end 'trim'

  describe('size', () => {
    it('should return the size of the data table', (done) => {
      expect(new BitArray([1, 2, 3, 4]).size()).to.equal(4)
      done()
    })
  }) // end 'size'

  describe('get', () => {
    var array

    beforeEach((done) => {
      array = new BitArray()
      array.table = [ 0b10101010, 0b11001100 ]
      done()
    })

    it('should get the value at the given bit index', (done) => {
      expect(array.get(0), 'array[0]').to.be.false()
      expect(array.get(1), 'array[1]').to.be.true()
      done()
    })

    it('should return values at any place in the data table', (done) => {
      expect(array.get(54), 'array[54]').to.be.false()
      expect(array.get(55), 'array[55]').to.be.true()
      done()
    })
  }) // end 'get'

  describe('set', () => {
    var array

    beforeEach((done) => {
      array = new BitArray()
      done()
    })

    it('should set a `true` value for the bit at the given index', (done) => {
      array.set(22, true)
      expect(array.get(22)).to.be.true()
      done()
    })

    it('should set a `false` value for the bit at the given index', (done) => {
      array.set(5, true)
      array.set(5, false)
      expect(array.get(5)).to.be.false()
      done()
    })
  }) // end 'set'

  describe('toggle', () => {
    var array

    beforeEach((done) => {
      array = new BitArray([ 0b10 ])
      done()
    })

    it('should toggle a bit "on"', (done) => {
      array.toggle(0)
      expect(array.get(0)).to.be.true()
      done()
    })

    it('should toggle a bit "off"', (done) => {
      array.toggle(1)
      expect(array.get(1)).to.be.false()
      done()
    })
  }) // end 'toggle'

  describe('map', () => {
    it('should return a bit array mapped under the given operation', (done) => {
      let array = new BitArray([1, 2, 3])
      expect(array.map((e) => { return e + 1 }).table).to.deep.equal([2, 3, 4])
      done()
    })
  }) // end 'map'

  describe('merge', () => {
    it('should merge the bit arrays under the given operation', (done) => {
      let a = new BitArray([1, 2, 3])
      let b = new BitArray([3, 2, 1])
      expect(a.merge(b, (k, j) => { return k + j }).table)
        .to.deep.equal([4, 4, 4])
      done()
    })

    it('should merge into larger bit arrays', (done) => {
      let a = new BitArray([1])
      let b = new BitArray([0, 2, 3])
      expect(a.merge(b, (k, j) => { return Math.max(k, j) }).table)
        .to.deep.equal([1, 2, 3])
      done()
    })

    it('should merge into smaller bit arrays', (done) => {
      let a = new BitArray([1, 2, 2])
      let b = new BitArray([1])
      expect(a.merge(b, (k, j) => { return k + j }).table)
        .to.deep.equal([2, 2, 2])
      done()
    })
  }) // end 'merge'

  describe('not', () => {
    it('should return the bitwise `not` of the bit array', (done) => {
      let given = [
        0b11111111111111111111111111111111111111111111111111111,
        0b11110000111100001111010100000111111101111111011111111,
        455,
        18,
        19,
        22
      ]
      expect(new BitArray(given).not().table)
        .to.deep.equal(given.map((entry) => { return ~entry }))
      done()
    })
  }) // end 'not'

  describe('and', () => {
    it('should return the bitwise `and` of the two bit arrays', (done) => {
      let a = new BitArray([ 0b101, 0b111 ])
      let b = new BitArray([ 0b100, 0b000 ])
      expect(a.and(b).table).to.deep.equal([0b100])
      done()
    })
  }) // end 'and'

  describe('or', () => {
    it('should return the bitwise `or` of the two bit arrays', (done) => {
      let a = new BitArray([ 0b101, 0b111 ])
      let b = new BitArray([ 0b010, 0b000 ])
      expect(a.or(b).table).to.deep.equal([0b111, 0b111])
      done()
    })
  }) // end 'or'

  describe('xor', () => {
    it('should return the bitwise `xor` of the two bit arrays', (done) => {
      let a = new BitArray([ 0b101, 0b111 ])
      let b = new BitArray([ 0b110, 0b101 ])
      expect(a.xor(b).table).to.deep.equal([0b11, 0b10])
      done()
    })
  }) // end 'xor'
}) // end 'BitArray'
