# prototype

- prototype, 函数对象创建之后有的一个属性，一般会有一个constructor属性指向函数对象
- \_\_proto__, 指向构造函数的prototype属性，Object.getPrototypeOf就是用来获取\_\_proto__

函数对象是由Function构建的, 所以函数对象的\_\_proto__都是指向Function.prototype

Function也是一个函数，它是由它自身构建的
```javascript
Function.__proto__ === Function.prototype // true
```

一般函数对象的prototype是一个对象，如Object.prototype，Array.prototype。但是Function.prototype比较特殊
```javascript
typeof Function.prototype // function
```

大部分函数可以当作构造函数，通过new操作符来创建实例对象，实例对象的\_\_proto__就指向构造函数的prototype。但也有特殊情况

- 箭头函数不可以作为构造函数
- class的成员方法不可以作为构造函数
- Function.prototype不可以作为构造函数
- 大部分内置函数（除了一些类型的函数如Number, String, Boolean, RegExp, Array, Object, Function...）

Function.prototype是函数，但是和其它不能作为构造函数的函数一样，没有自己的prototype
```javascript
typeof Function.prototype.prototype // undefined
```

Function.prototype作为一个函数，它的\_\_proto__比较特殊，其它的函数的\_\_proto__指向Function.prototype
```javascript
Function.prototype.__proto__ === Object.prototype // true
Array.isArray.__proto__ === Function.prototype // true
```

大部分对象的\_\_proto__都指向构造函数的prototype，只有Object.prototype却没有\_\_protot__
```javascript
Object.prototype.__proto__ // null
```

正常情况一下，对象都可以通过\_\_proto__一直访问到Object.prototype。所以在Object.prototype上添加一些变量或方法，在其它的对象上都可以直接调用。比如默认自带的toString方法。当然有些类型会在自己的prototype上重写toString方法

Object.\_\_proto__指向Function.prototype，所以Object.toString方法指的是Function.prototype.toString。如果删掉Function.prototype.toString被delete掉，则Object.toString则会调用到Object.prototype.toString
```javascript
Function.prototype.toString.call(Object) // function Object() { [native code] }
Object.prototype.toString.call(Object) // [object Function]

Object.toString() // function Object() { [native code] } 调用了Function.prototype.toString
delete Function.prototype.toString
Object.toString() // [object Function] 调用到了Object.prototype.toString
```
