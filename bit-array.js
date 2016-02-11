'use strict'

/**
 * An uncompressed bit array implementation.
 * @module dsa/bit-array
 */
module.exports = BitArray

/**
 * Maximum number of "safe" integer bits for each storage entry in the BitArray.
 * @type {integer}
 */
const MAX_BITS_PER_ENTRY = Math.log2(Number.MAX_SAFE_INTEGER)

/**
 * An uncompressed bit array implementation featuring core bitwise methods with
 * dynamic space optimal storage.
 * @class
 * @author Ryan Sandor Richards
 */
class BitArray {
  /**
   * Creates a new BitArray object representing an array containing all zeros.
   * @param {array} [data] Array of integers representing the initial state of
   *   the bit array. Defaults to `[]`.
   */
  constructor (data) {
    this._table = []
    if (Array.isArray(data)) {
      this._table = data
      this._trim()
    }
  }

  /**
   * @return The maximum number of bits that can be held by entries in the data
   *   table.
   */
  static getMaxBitsPerEntry () {
    return MAX_BITS_PER_ENTRY
  }

  /**
   * Gets the data table entry for the given bit index. This method will return
   * `0` if the given bit index maps to an entry that is out-of-bounds.
   * @param {integer} bitIndex The bit index (bit number) for which to fetch
   *   the data table entry.
   * @return {integer} The data table entry that contains the given bit index.
   */
  _getEntry (bitIndex) {
    let tableIndex = parseInt(bitIndex / MAX_BITS_PER_ENTRY)
    if (tableIndex >= this._table.length) {
      return 0
    }
    return this._table[tableIndex]
  }

  /**
   * Sets the data table entry for which contains the given bit index to the
   * given value. This method will resize the data table so that it can be
   * addressed by the given bit index.
   * @param {integer} bitIndex The bit index (bit number) for which to set the
   *   data table entry.
   * @param {integer} entry Entry to set.
   */
  _setEntry (bitIndex, entry) {
    let tableIndex = parseInt(bitIndex / MAX_BITS_PER_ENTRY)
    for (let k = tableIndex - this._table.length; k >= 0; k--) {
      this._table.push(0)
    }
    this._table[tableIndex] = entry
    this._trim()
  }

  /**
   * Determines the offset on the data table entry that contains the given
   * bit index.
   * @param {integer} bitIndex Bit index for which to find the entry offset.
   * @return {integer} The offset relative to the data table entry.
   */
  _getOffset (bitIndex) {
    return bitIndex % MAX_BITS_PER_ENTRY
  }

  /**
   * Removes all high-order entry zeros from the BitArray data table
   * effectively reclaiming unused entries.
   */
  _trim () {
    while (this.size() > 0 && this._table[this.size() - 1] === 0) {
      this._table.pop()
    }
  }

  /**
   * @return The number of integers needed to represent this bit array.
   */
  size () {
    return this._table.length
  }

  /**
   * Gets the individual bit value at the given index.
   * @param {integer} bitIndex Index of the bit to fetch.
   * @return {boolean} The bit value at the given index.
   */
  get (bitIndex) {
    return (this._getEntry(bitIndex) & (1 << this._getOffset(bitIndex))) > 0
  }

  /**
   * Sets the individual bit value at the given index.
   * @param {integer} bitIndex Index of the bit to fetch.
   * @param {boolean} value Value to set.
   */
  set (bitIndex, value) {
    let entry = this._getEntry(bitIndex)
    let entryOffset = this._getOffset(bitIndex)
    if (value) {
      this._setEntry(bitIndex, entry | (1 << entryOffset))
    } else {
      this._setEntry(bitIndex, entry & (~(1 << entryOffset)))
    }
  }

  /**
   * Toggles the bit at the given index.
   * @param {integer} index Index of the bit to toggle.
   * @return {boolean} The resulting value of the bit.
   */
  toggle (index) {
    let entry = this._getEntry(index)
    let offset = this._getOffset(index)
    this._setEntry(index, entry ^ (1 << offset))
  }

  /**
   * Maps this BitArray to a new BitArray under the given unary operation.
   * @param {function} op Operation to perform during the map.
   * @return {BitArray} A new bit array transformed under the given operation.
   */
  map (op) {
    return new BitArray(this._table.map(op))
  }

  /**
   * Merges this BitArrays into a new BitArray by applying the given binary
   * operation.
   * @param {BitArray} b Bit array to "merge" into.
   * @param {function} op Binary operation used to perform the merge.
   * @return {BitArray} A new bit array that represents the merge of the given
   *   arrays under the given operation.
   */
  merge (b, op) {
    let a = this
    let aTable = a._table.slice()
    let bTable = b._table.slice()

    if (a.size() < b.size()) {
      for (let k = 0; k < b.size() - a.size(); k++) {
        aTable.push(0)
      }
    } else if (b.size() < a.size()) {
      for (let k = 0; k < a.size() - b.size(); k++) {
        bTable.push(0)
      }
    }

    return new BitArray(aTable.map(function (entry, i) {
      return op(entry, bTable[i])
    }))
  }

  /**
   * Performs a bitwise "not" on this bit array.
   * @return {BitArray} A new bit array representing the bitwise not of this
   *   bit array.
   */
  not () {
    return this.map((entry) => { return ~entry })
  }

  /**
   * Peforms a bitwise "and" with this bit array and the given bit array.
   * @param {BitArray} b Right operand for the bitwise "and".
   * @return {BitArray} A new bit array that representing the result.
   */
  and (b) {
    return this.merge(b, (k, j) => { return k & j })
  }

  /**
   * Peforms a bitwise "or" with this bit array and the given bit array.
   * @param {BitArray} b Right operand for the bitwise "or".
   * @return {BitArray} A new bit array that representing the result.
   */
  or (b) {
    return this.merge(b, (k, j) => { return k | j })
  }

  /**
   * Peforms a bitwise "xor" with this bit array and the given bit array.
   * @param {BitArray} b Right operand for the bitwise "xor".
   * @return {BitArray} A new bit array that representing the result.
   */
  xor (b) {
    return this.merge(b, (k, j) => { return k ^ j })
  }
}
