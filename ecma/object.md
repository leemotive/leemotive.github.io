The Object constructor:

- is the intrinsic object %Object%
- is the initial value of the Object property of the global object.
- creates new ordinary object when called as a contructor.
- performs a type conversion when called as a function rather than as a contructor.
- is designed to be subclassable. It may be used as the value of an extends clause of a class definition.


## Properties of the Object Constructor

- has a [[Prototype]] internal slot whose value is the intrinsic object %FunctionPrototype%
- has a "length" property
- has the following additional properties:


### Object.assign(target, ...sources)
The **assign** function is used to copy the values of all of the enumerable own properties from one or more source objects to a target object. 

`OwnPropertyKeys`, `enumerable`

### Object.create(O, Properties)
The **create** function creates a new object with a specified prototype. 

如果O为null, 那么新建出来的对象的原型就是null, 也就是说这个新对象无法直接使用到Object.prototype上的一些方法了，这和对象字面量`{}`创建出来的对象是不一样的


### Object.defineProperties(O, Properties)
The **defineProperties** function is used to add own properties and/or update the attributes of existing own properties of an object.

### Object.defineProperty(O, P, Attributes)
The **defineProperty** function is used to add an own property and/or update the attributes of an existing own property of an object.

### Object.entries(O)

### Object.freeze(O)
只针对数据属性有效, 对访问器属性无效

### Object.fromEntries(iterable)
迭代对象有0和1属性，分别作为key和value

### Object.getOwnPropertyDescriptor(O, P)

### Object.getOwnPropertyDescriptors(O)

### Object.getOwnPropertyNames(O)

### Object.getOwnPropertySymbols(O)

### Object.getPrototypeOf(O)


### Object.is(value1, value2)
return SameValue(value1, value2), +0 and -0 are different


### Object.isExtensible(O)

### Object.isFrozen(O)

### Object.isSealed(O)

### Object.keys(O)
enumerable own property names

### Object.prevenExtensions

### Object.prototype
The initial value of Object.prototype is the intrinsic object %ObjectPrototype%

The property has the attributes{[[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false}

### Object.seal(O)

### Object.setPrototypeOf(O, proto)

### Object.values(O)
enumerable own property names


## Properties of the Object Prototype Object
The Object prototype object:
- is the intrinsic object %ObjectPrototype%
- is an immutable prototype exotic object
- has a [[Prototype]] internal slot whose value is null

### Object.prototype.constructor

### Object.prototype.hasOwnProperty(V)

### Object.prototype.isPrototypeOf(V)

### Object.prototype.propertyIsEnumerable(V)
does not consider objects in the prototype chain

### Object.prototype.toLocaleString([reserved1 [, reserved2]])

### Object.prototype.toString()

### Object.prototype.valueOf()
