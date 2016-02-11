## Modules

<dl>
<dt><a href="#module_dsa/bit-array">dsa/bit-array</a></dt>
<dd><p>An uncompressed bit array implementation.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#MAX_BITS_PER_ENTRY">MAX_BITS_PER_ENTRY</a> : <code>integer</code></dt>
<dd><p>Maximum number of &quot;safe&quot; integer bits for each storage entry in the BitArray.</p>
</dd>
</dl>

<a name="module_dsa/bit-array"></a>
## dsa/bit-array
An uncompressed bit array implementation.

**Author:** Ryan Sandor Richards  

* [dsa/bit-array](#module_dsa/bit-array)
    * [module.exports](#exp_module_dsa/bit-array--module.exports) ⏏
        * [new module.exports([data])](#new_module_dsa/bit-array--module.exports_new)
        * [.getMaxBitsPerEntry()](#module_dsa/bit-array--module.exports.getMaxBitsPerEntry) ⇒

<a name="exp_module_dsa/bit-array--module.exports"></a>
### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_dsa/bit-array--module.exports_new"></a>
#### new module.exports([data])
Creates a new BitArray object representing an array containing all zeros.


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>array</code> | Array of integers representing the initial state of   the bit array. Defaults to `[]`. |

<a name="module_dsa/bit-array--module.exports.getMaxBitsPerEntry"></a>
#### module.exports.getMaxBitsPerEntry() ⇒
**Kind**: static method of <code>[module.exports](#exp_module_dsa/bit-array--module.exports)</code>  
**Returns**: The maximum number of bits that can be held by entries in the data
  table.  
<a name="MAX_BITS_PER_ENTRY"></a>
## MAX_BITS_PER_ENTRY : <code>integer</code>
Maximum number of "safe" integer bits for each storage entry in the BitArray.

**Kind**: global constant  
