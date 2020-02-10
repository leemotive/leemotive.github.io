The *global object*:
  - is created before control enters any execution context.
  - does not have a [[Construct]] internal method; it cannot be used as a constructor with the **new** operator.
  - does not have a [[Call]] internal method; it cannot be invoked as a function.
  - has a [[Prototype]] internal method slot whose value is implementation-dependent.
  - may have host defined properties in addition to the properties defined in this specification. This may include a property whose value is the global object itself.


## Value properties of the Global Object

Infinity, NaN, undefined, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent


## Function Properties of the Global Object

eval, isFinite, isNaN, parseFloat, parseInt,

## Constructor Properties of the Global Object

Array, ArrayBuffer, Boolean, DataView, Date, Error, EvalError, Float32Array, Float64Array, Function, Int8Array, Int18Array, Int32Array, Map, Number, Object, Promise, Proxy, RangeError, ReferenceError, RegExp, Set, SharedArrayBuffer, String, Symbol, SyntaxError, TypeError, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, URIError, WeakMap, WeakSet


## Other Properties of the Global Object

Atomics, JSON, Math, Reflect
