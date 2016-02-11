'use strict'

/**
 * Maximum number of "safe" integer bits for each storage entry in the BitArray.
 * @type {integer}
 */
const MAX_ENTRY_INDEX = Math.log2(Number.MAX_SAFE_INTEGER)

/**
 * An uncompressed bit array implementation.
 * @class
 * @module dsa/bit-array
 * @author Ryan Sandor Richards
 */
module.exports = class BitArray {
  /**
   * Creates a new BitArray object representing an array containing all zeros.
   */
  constructor() {
    this._table = [0]
  }

  /**
   * Gets the individual bit value at the given index.
   * @param {integer} index Index to fetch.
   * @return {boolean} The bit value at the given index.
   */
  get(index) {
    let tableIndex = parseInt(index / MAX_ENTRY_INDEX)

    if (tableIndex >= this._table.length) {
      return false
    }

    let entry = this._table[tableIndex]
    let entryOffset = index % MAX_ENTRY_INDEX
    return (entry & (1 << entryOffset)) > 0
  }

  /**
   * Sets the individual bit value at the given index.
   * @param {integer} index Index to set.
   * @param {boolean} value Value to set.
   */
  set(index, value) {
    let tableIndex = parseInt(index / MAX_ENTRY_INDEX)

    for (let k = tableIndex - this._table.length; k >= 0; k--) {
      this._table.push(0)
    }

    let entry = this._table[tableIndex]
    let entryOffset = index % MAX_ENTRY_INDEX

    if (value) {
      this._table[tableIndex] = entry | (1 << entryOffset)
    }
    else {
      this._table[tableIndex] = entry & (~(1 << entryOffset))
    }
  }
}
