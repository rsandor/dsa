<a name="module_dsa/bit-array"></a>
## dsa/bit-array
An uncompressed bit array implementation.


* [dsa/bit-array](#module_dsa/bit-array)
    * [~BitArray](#module_dsa/bit-array..BitArray)
        * [new BitArray([data])](#new_module_dsa/bit-array..BitArray_new)
        * _instance_
            * [._getEntry(bitIndex)](#module_dsa/bit-array..BitArray+_getEntry) ⇒ <code>integer</code>
            * [._setEntry(bitIndex, entry)](#module_dsa/bit-array..BitArray+_setEntry)
            * [._getOffset(bitIndex)](#module_dsa/bit-array..BitArray+_getOffset) ⇒ <code>integer</code>
            * [._trim()](#module_dsa/bit-array..BitArray+_trim)
            * [.size()](#module_dsa/bit-array..BitArray+size) ⇒
            * [.get(bitIndex)](#module_dsa/bit-array..BitArray+get) ⇒ <code>boolean</code>
            * [.set(bitIndex, value)](#module_dsa/bit-array..BitArray+set)
            * [.toggle(index)](#module_dsa/bit-array..BitArray+toggle) ⇒ <code>boolean</code>
            * [.map(op)](#module_dsa/bit-array..BitArray+map) ⇒ <code>BitArray</code>
            * [.merge(b, op)](#module_dsa/bit-array..BitArray+merge) ⇒ <code>BitArray</code>
            * [.not()](#module_dsa/bit-array..BitArray+not) ⇒ <code>BitArray</code>
            * [.and(b)](#module_dsa/bit-array..BitArray+and) ⇒ <code>BitArray</code>
            * [.or(b)](#module_dsa/bit-array..BitArray+or) ⇒ <code>BitArray</code>
            * [.xor(b)](#module_dsa/bit-array..BitArray+xor) ⇒ <code>BitArray</code>
        * _static_
            * [.getMaxBitsPerEntry()](#module_dsa/bit-array..BitArray.getMaxBitsPerEntry) ⇒
    * [~MAX_BITS_PER_ENTRY](#module_dsa/bit-array..MAX_BITS_PER_ENTRY) : <code>integer</code>

<a name="module_dsa/bit-array..BitArray"></a>
### dsa/bit-array~BitArray
An uncompressed bit array implementation featuring core bitwise methods with
dynamic space optimal storage.

**Kind**: inner class of <code>[dsa/bit-array](#module_dsa/bit-array)</code>  
**Author:** Ryan Sandor Richards  

* [~BitArray](#module_dsa/bit-array..BitArray)
    * [new BitArray([data])](#new_module_dsa/bit-array..BitArray_new)
    * _instance_
        * [._getEntry(bitIndex)](#module_dsa/bit-array..BitArray+_getEntry) ⇒ <code>integer</code>
        * [._setEntry(bitIndex, entry)](#module_dsa/bit-array..BitArray+_setEntry)
        * [._getOffset(bitIndex)](#module_dsa/bit-array..BitArray+_getOffset) ⇒ <code>integer</code>
        * [._trim()](#module_dsa/bit-array..BitArray+_trim)
        * [.size()](#module_dsa/bit-array..BitArray+size) ⇒
        * [.get(bitIndex)](#module_dsa/bit-array..BitArray+get) ⇒ <code>boolean</code>
        * [.set(bitIndex, value)](#module_dsa/bit-array..BitArray+set)
        * [.toggle(index)](#module_dsa/bit-array..BitArray+toggle) ⇒ <code>boolean</code>
        * [.map(op)](#module_dsa/bit-array..BitArray+map) ⇒ <code>BitArray</code>
        * [.merge(b, op)](#module_dsa/bit-array..BitArray+merge) ⇒ <code>BitArray</code>
        * [.not()](#module_dsa/bit-array..BitArray+not) ⇒ <code>BitArray</code>
        * [.and(b)](#module_dsa/bit-array..BitArray+and) ⇒ <code>BitArray</code>
        * [.or(b)](#module_dsa/bit-array..BitArray+or) ⇒ <code>BitArray</code>
        * [.xor(b)](#module_dsa/bit-array..BitArray+xor) ⇒ <code>BitArray</code>
    * _static_
        * [.getMaxBitsPerEntry()](#module_dsa/bit-array..BitArray.getMaxBitsPerEntry) ⇒

<a name="new_module_dsa/bit-array..BitArray_new"></a>
#### new BitArray([data])
Creates a new BitArray object representing an array containing all zeros.


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>array</code> | Array of integers representing the initial state of   the bit array. Defaults to `[]`. |

<a name="module_dsa/bit-array..BitArray+_getEntry"></a>
#### bitArray._getEntry(bitIndex) ⇒ <code>integer</code>
Gets the data table entry for the given bit index. This method will return
`0` if the given bit index maps to an entry that is out-of-bounds.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>integer</code> - The data table entry that contains the given bit index.  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>integer</code> | The bit index (bit number) for which to fetch   the data table entry. |

<a name="module_dsa/bit-array..BitArray+_setEntry"></a>
#### bitArray._setEntry(bitIndex, entry)
Sets the data table entry for which contains the given bit index to the
given value. This method will resize the data table so that it can be
addressed by the given bit index.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>integer</code> | The bit index (bit number) for which to set the   data table entry. |
| entry | <code>integer</code> | Entry to set. |

<a name="module_dsa/bit-array..BitArray+_getOffset"></a>
#### bitArray._getOffset(bitIndex) ⇒ <code>integer</code>
Determines the offset on the data table entry that contains the given
bit index.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>integer</code> - The offset relative to the data table entry.  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>integer</code> | Bit index for which to find the entry offset. |

<a name="module_dsa/bit-array..BitArray+_trim"></a>
#### bitArray._trim()
Removes all high-order entry zeros from the BitArray data table
effectively reclaiming unused entries.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
<a name="module_dsa/bit-array..BitArray+size"></a>
#### bitArray.size() ⇒
**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: The number of integers needed to represent this bit array.  
<a name="module_dsa/bit-array..BitArray+get"></a>
#### bitArray.get(bitIndex) ⇒ <code>boolean</code>
Gets the individual bit value at the given index.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>boolean</code> - The bit value at the given index.  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>integer</code> | Index of the bit to fetch. |

<a name="module_dsa/bit-array..BitArray+set"></a>
#### bitArray.set(bitIndex, value)
Sets the individual bit value at the given index.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>integer</code> | Index of the bit to fetch. |
| value | <code>boolean</code> | Value to set. |

<a name="module_dsa/bit-array..BitArray+toggle"></a>
#### bitArray.toggle(index) ⇒ <code>boolean</code>
Toggles the bit at the given index.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>boolean</code> - The resulting value of the bit.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>integer</code> | Index of the bit to toggle. |

<a name="module_dsa/bit-array..BitArray+map"></a>
#### bitArray.map(op) ⇒ <code>BitArray</code>
Maps this BitArray to a new BitArray under the given unary operation.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>BitArray</code> - A new bit array transformed under the given operation.  

| Param | Type | Description |
| --- | --- | --- |
| op | <code>function</code> | Operation to perform during the map. |

<a name="module_dsa/bit-array..BitArray+merge"></a>
#### bitArray.merge(b, op) ⇒ <code>BitArray</code>
Merges this BitArrays into a new BitArray by applying the given binary
operation.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>BitArray</code> - A new bit array that represents the merge of the given
  arrays under the given operation.  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitArray</code> | Bit array to "merge" into. |
| op | <code>function</code> | Binary operation used to perform the merge. |

<a name="module_dsa/bit-array..BitArray+not"></a>
#### bitArray.not() ⇒ <code>BitArray</code>
Performs a bitwise "not" on this bit array.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>BitArray</code> - A new bit array representing the bitwise not of this
  bit array.  
<a name="module_dsa/bit-array..BitArray+and"></a>
#### bitArray.and(b) ⇒ <code>BitArray</code>
Peforms a bitwise "and" with this bit array and the given bit array.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>BitArray</code> - A new bit array that representing the result.  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitArray</code> | Right operand for the bitwise "and". |

<a name="module_dsa/bit-array..BitArray+or"></a>
#### bitArray.or(b) ⇒ <code>BitArray</code>
Peforms a bitwise "or" with this bit array and the given bit array.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>BitArray</code> - A new bit array that representing the result.  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitArray</code> | Right operand for the bitwise "or". |

<a name="module_dsa/bit-array..BitArray+xor"></a>
#### bitArray.xor(b) ⇒ <code>BitArray</code>
Peforms a bitwise "xor" with this bit array and the given bit array.

**Kind**: instance method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: <code>BitArray</code> - A new bit array that representing the result.  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitArray</code> | Right operand for the bitwise "xor". |

<a name="module_dsa/bit-array..BitArray.getMaxBitsPerEntry"></a>
#### BitArray.getMaxBitsPerEntry() ⇒
**Kind**: static method of <code>[BitArray](#module_dsa/bit-array..BitArray)</code>  
**Returns**: The maximum number of bits that can be held by entries in the data
  table.  
<a name="module_dsa/bit-array..MAX_BITS_PER_ENTRY"></a>
### dsa/bit-array~MAX_BITS_PER_ENTRY : <code>integer</code>
Maximum number of "safe" integer bits for each storage entry in the BitArray.

**Kind**: inner constant of <code>[dsa/bit-array](#module_dsa/bit-array)</code>  
