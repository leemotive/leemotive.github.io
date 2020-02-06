# ECMA

- history
1. ECMAScript 1.0 (1997)
2. ECMAScript 2.0 (1998)
3. ECMAScript 3.0 (1999)
4. ECMAScript 5.0 (2009)
4. ECMAScript 5.1 (2011)
5. ES6 (ECMAScript 2015)
7. ECMAScript 2016
8. ECMAScript 2017
9. ECMAScript 2018
10. ECMAScript 2019

- terms

| 英语 | 中文 |  |
|---|---|---|
| unary operations | 一元运算符 |
| multiplicative operators | 乘法运算符 |
| additive operators | 加法运算符 |
| bitwise shift operators | 位移运算符 |
| relational operators | 关系运算符 |
| equality operators | 等式运算符 |
| binary bitwise operators | 二进制运算符 |
| binary logical operators | 二进制逻辑运算符 |
| assignment operators | 赋值运算符 |
| comma operator | 逗号运算符 |
| primitive value | 原始值 | 基础类型的值 |
| context-free grammar | 上下文无关语法 |
| production | 产生式 |


- A primitive value is a member of one of the following built-in types: **Undefined, Null, Boolean, Number, String**, and **Symbol**; an object is a member of the built-in type **Object**; and a function is a callable object. A function that is associated with an object via a property is called a method.

- ECMAScript defines a collection of built-in objects that round out the definition of ECMAScript entities. These built-in objects include the global object; objects that are fundamental to the runtime semantics of the language including **Object, Function, Boolean, Symbol**, and various **Error** objects; objects that represent and manipulate numeric values including **Math, Number**, and **Date**; the text processing objects **String** and **RegExp**; objects that are indexed collections of values including **Array** and nine different kinds of Typed Arrays whose elements all have a specific numeric data representation; keyed collections including **Map** and **Set** objects; objects supporting structured data including the **JSON** object, **ArrayBuffer, SharedArrayBuffer**, and **DataView**; objects supporting control abstractions including generator functions and **Promise** objects; and reflection objects including **Proxy** and **Reflect**.

- Every object created by a constructor has an implicit reference (called the object's prototype) to the value of its constructor's **"prototype"** property. Furthermore, a prototype may have a non-null implicit reference to its prototype, and so on; this is called the prototype chain. 

- Well-Known Symbols


|Specification Name|[[Description]]|Value and Purpose|
|---|---|---|
|@@asyncIterator|"Symbol.asyncIterator"|A method that returns the default AsyncIterator for an object. Called by the semantics of the  for-await-of statement.|
|@@hasInstance|"Symbol.hasInstance"|A method that determines if a **constructor** object recognizes an object as one of the **constructor**'s instances. Called by the semantics of the instanceof operator.|
|@@isConcatSpreadable|"Symbol.isConcatSpreadable"|A Boolean valued property that if true indicates that an object should be flattened to its array elements by **Array.prototype.concat**.|
|@@iterator|"Symbol.iterator"|	A method that returns the default Iterator for an object. Called by the semantics of the for-of statement.|
|@@match|"Symbol.match"|A regular expression method that matches the regular expression against a string. Called by the **String.prototype.match** method.|\
|@@replace|"Symbol.replace"|A regular expression method that replaces matched substrings of a string. Called by the **String.prototype.replace** method.|
|@@search|"Symbol.search"|A regular expression method that returns the index within a string that matches the regular expression. Called by the  **String.prototype.search** method.|
|@@species|"Symbol.species"|A function valued property that is the **constructor** function that is used to create derived objects.|
|@@split|"Symbol.split"|A regular expression method that splits a string at the indices that match the regular expression. Called by the  **String.prototype.split** method.|
|@@toPrimitive|"Symbol.toPrimitive"|A method that converts an object to a corresponding primitive value. Called by the **ToPrimitive** abstract operation.|
|@@toStringTag|"Symbol.toStringTag"|A String valued property that is used in the creation of the default string description of an object. Accessed by the built-in method  **Object.prototype.toString**.|
|@@unscopables|"Symbol.unscopables"|An object valued property whose own and inherited property names are property names that are excluded from the with environment bindings of the associated object.|

- data property  
  [[Value]]、[[Writable]]、[[Enumerable]]、[[Configurable]]
  
- accessor property  
  [[Get]]、[[Set]]、[[Enumerable]]、[[Configurable]]


- default attribute values  

  | Attribute Name | Default Value |
  |---|---|
  | [[Value]] | undefined |
  | [[Get]] | undefined |
  | [[Set]] | undefined |
  | [[Writable]] | false |
  | [[Enumerable]] | false |
  | [[Configurable]] | false |


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



> Data properties of the [[Prototype]] object are inherited (and visible as properties of the child object) for the purposes of get access, but not for set access. Accessor properties are inherited for both get access and set access.


> once the value of an object's [[Extensible]] internal slot has been set to false, it is no longer possible to add properties to the object, to modify the value of the object's [[Prototype]] internal slot, or to subsequently change the value of [[Extensible]] to true.

> If F.[[FunctionKind]] is **"classConstructor"**, throw a **TypeError** exception.
