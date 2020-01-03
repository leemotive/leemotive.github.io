# ECMA

- history
1. ECMAScript 1.0（1997）
2. ECMAScript 2.0（1998）
3. ECMAScript 3.0（1999）
4. ECMAScript 5.0（2009）
5. ES6 (ECMAScript 2015)
7. ES7 (ECMAScript 2016)
8. ES8 (ECMAScript 2017)
9. ES9 (ECMAScript 2018)
10. ES10 (ECMAScript 2019)


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
