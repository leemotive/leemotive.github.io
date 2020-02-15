
- A primitive value is a member of one of the following built-in types: **Undefined, Null, Boolean, Number, String**, and **Symbol**; an object is a member of the built-in type **Object**; and a function is a callable object. A function that is associated with an object via a property is called a method.

- ECMAScript defines a collection of built-in objects that round out the definition of ECMAScript entities. These built-in objects include the global object; objects that are fundamental to the runtime semantics of the language including **Object, Function, Boolean, Symbol**, and various **Error** objects; objects that represent and manipulate numeric values including **Math, Number**, and **Date**; the text processing objects **String** and **RegExp**; objects that are indexed collections of values including **Array** and nine different kinds of Typed Arrays whose elements all have a specific numeric data representation; keyed collections including **Map** and **Set** objects; objects supporting structured data including the **JSON** object, **ArrayBuffer, SharedArrayBuffer**, and **DataView**; objects supporting control abstractions including generator functions and **Promise** objects; and reflection objects including **Proxy** and **Reflect**.

- Every object created by a constructor has an implicit reference (called the object's prototype) to the value of its constructor's **"prototype"** property. Furthermore, a prototype may have a non-null implicit reference to its prototype, and so on; this is called the prototype chain. 


- Data properties of the [[Prototype]] object are inherited (and visible as properties of the child object) for the purposes of get access, but not for set access. Accessor properties are inherited for both get access and set access.


- once the value of an object's [[Extensible]] internal slot has been set to false, it is no longer possible to add properties to the object, to modify the value of the object's [[Prototype]] internal slot, or to subsequently change the value of [[Extensible]] to true.

- class声明的函数不可以被当作普通函数执行， If F.[[FunctionKind]] is **"classConstructor"**, throw a **TypeError** exception.



- The source text of an ECMAScript Script or Module is first converted into a sequence of input elements, which are tokens, line terminators, comments, or white space.

- The source text of an ECMAScript Script or Moudle is first converted into a sequence of input elements, which are tokens, line terminators, comments, or white space. The source text is scanned from left to right, repeatedly taking the longest possible sequence of code points as the next input element.
