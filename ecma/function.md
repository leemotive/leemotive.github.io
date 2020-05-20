# Function

## The Function constructor:

- is the intrinsic object %Function%
- is the initial value of the Function prototype of the global object.
- creates and initializes a new function object when called as a function rather than as a constructor. Thus the function call Function(...) is equivalent to the object creation expression new Function(...) with the same arguments.
- is designed to be subclassable. It may be used as the value of an extends clause of a class definition. Subclass constructors that intend to inherit the specified Function behaviour must include a super call to the Function constructor to create and initialize a subclass instance with the internal slots necessary for built-in function behaviour. All ECMAScript syntactic forms for defining function objects create instances of Function. There is no syntactic means to create instances of Function subclasses except for the build-in GeneratorFunction, AsyncFunction, and AsyncGeneratorFunction subclasses.

## Function(p1, p2, ..., pn, body)

The last argument specifies the body(executable code) of a function; any preceding arguments specify formal parameters.

It is permissible but not necessary to have one argument for each formal parameter to be specified. For example, all of the following expressions produce the same result 

```js
new Function('a', 'b', 'c', 'return a + b + c'); 
new Function('a,b', 'c', 'return a + b + c');
```




## Properties of the Function Constructor
The Function constructor:
- is itself a build-in function object.
- has a [[Prototype]] internal slot whose value is the intrinsic object %FunctionPrototype%
- has the following properties


## Properties of the Function Prototype Object
The Function prototype object:
- is the intrinsic object %FunctionPrototype%
- is isself a build-in function object.
- accepts any arguments and returns undefined when invoked.
- does not have a [[Construct]] internal method; it cannot be used as a constructor with the new operator.
- has a [[Prototype]] internal slot whose value is the intrinsic object %ObjectPrototype%
- does not have a prototype property
- has a "length" property whose value is 0
- has a name property whose value is the empty String.


### Function.prototype.apply(thisArg, argArray)

### Function.prototype.bind(thisArg, ...args)

### Function.prototype.call(thisArg, ...args)

### Function.prototype.constructor
The initial value of Function.prototype.constructor is the intrinsic object %Function%

### Function.prototype.toString()


### Function.prototype[@@hasInstance](V)
The value of the name property of this function is "[Symbol.hasInstance]" 

This property has the attributes {[[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false}  

This is the default implementation of @@hasInstance that most functions inherit. @@hasInstance is called by the **instanceof** operator to determine whether a value is an instance of a specific constructor. An expression such as `v instanceof F` evaluates as `F[@@hasInstance](v)`



## ArrowFunction

> An [ArrowFunction](https://tc39.es/ecma262/#prod-ArrowFunction) does not define local bindings for `arguments`, `super`, `this`, or `new.target`. 

不可以作为构造函数使用，当然 class 定义的其实也是函数，但是不能作为普通函数调用，只能通过 new 产生实例对象

不可以作为 Generator 函数