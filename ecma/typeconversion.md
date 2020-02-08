
- ToPrimitive ( input [ , PreferredType ] )

The abstract operation ToPrimitive takes an input argument and an optional argument PreferredType. The abstract operation ToPrimitive converts its input argument to a non-Object type. If an object is capable of converting to more than one primitive type, it may use the optional hint PreferredType to favour that type. Conversion occurs according to the following algorithm:


  1. Assert: input is an ECMAScript language value.
  2. If Type(input) is Object, then
      1. If PreferredType is not present, let hint be "default".
      2. Else if PreferredType is hint String, let hint be "string".
      3. Else PreferredType is hint Number, let hint be "number".
      4. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
      5. If exoticToPrim is not undefined, then
          1. Let result be ? Call(exoticToPrim, input, « hint »).
          2. If Type(result) is not Object, return result.
          3. Throw a TypeError exception.
      6. If hint is "default", set hint to "number".
      7. Return ? OrdinaryToPrimitive(input, hint).
  3. Return input.
  
  
- OrdinaryToPrimitive ( O, hint )  

When the abstract operation OrdinaryToPrimitive is called with arguments O and hint, the following steps are taken:

  1. Assert: Type(O) is Object.
  2. Assert: Type(hint) is String and its value is either "string" or "number".
  3. If hint is "string", then
      1. Let methodNames be « "toString", "valueOf" ».
  4. Else,
      1. Let methodNames be « "valueOf", "toString" ».
  5. For each name in methodNames in List order, do
      1. Let method be ? Get(O, name).
      2. If IsCallable(method) is true, then
          1. Let result be ? Call(method, O).
          2. If Type(result) is not Object, return result.
  6. Throw a TypeError exception.


- ToBoolean(arguments)

  | Argument Type | Result |
  |---|---|
  | Undefined | false |
  | Null | false |
  | Boolean | argument |
  | Number | If argument is +0, -0, or NaN, return false, otherwise return true |
  | String | if argument is the empty String(length is zero) return false, otherwise return false |
  | Symbol | true |
  | Object | true |
  
  
- ToNumber(argument)

  | Argument Type | Result |
  |---|---|
  | Undefined | NaN |
  | Null | +0 |
  | Boolean | if argument is true return 1, If argument is false return +0 |
  | Number | return argument |
  | Symbol | Throw a TypeError exception |
  | Object | 1. Let primValue be ? ToPrimitive(argument, hint Number).<br/> 2. Return ? ToNumber(primValue). |
  
- ToInteger(argument)

1. Let number be ? ToNumber(argument)
2. If number is NaN, return +0
3. If number is +0, -0, +∞, or -∞, return number
4. Return the number value that is the same sign as number and whose magnitude is floor(abs(number))


- ToString(argument)

| Argument Type | Result |
|---|---|
| Undefined | 'undefined' |
| Null | 'null' |
| Boolean | 'true' or 'false' |
| Number | NumberToString(argument) |
| String | return argument |
| Symbol | Throw a TypeError exception |
| Object | 1. Let primValue be ? ToPrimitive(argument, hint String).<br />2. Return ? ToString(primValue). |


- ToPropertyKey(argument)

The abstract operation ToPropertyKey converts argument to a value that can be used as a property key by performing the following steps:

  1. Let key be ? ToPrimitive(argument, hint String)
  2. If Type(key) is Symbol, then return key
  3. Return !ToString(key)


- IsArray(argument)

1. If Type(argument) is not Object, return false
2. If argument is an Array exotic object, return true.
3. If argument is a Proxy exotic object, then
    1. If argument.[[ProxyHandle]] is null, throw a TypeError exception
    2. Let target be argument.[[ProxyTarget]]
    3. return ? IsArray(target)
4. Return false


- IsInteger(argument)

1. If Type(argument) is not Number, return false
2. If argument is NaN, +∞, or -∞ return false
3. If floor(abs(argument)) ≠ abs(argument), return false
4. Return true

- Strict Equality Comparison

The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows:

1. If Type(x) is different from Type(y) return false
2. If Type(y) is Number then
    1. If x is NaN, return false
    2. If y is NaN, return false
    3. If x is the same Number value as y, return true
    4. +0 === -0
    5. Return false
3. Return SameValueNonNumber(x, y)
