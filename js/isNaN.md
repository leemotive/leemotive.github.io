js里提供了两个isNaN方法
- 全局的isNaN
- Number.isNaN

起初以为这两个方法是一样的，类似parseInt和parseFloat一样
```javascript
parseInt === Number.parseInt // true
parseFloat === Number.parseFloat // true
```

其实这两个方法是不一样的

全局的isNaN在执行时会先将参数调用ToNumber转化为数字，然后再判断
> 1. Let num be ? ToNumber(number).
> 2. If num is NaN, return true.
> 3. Otherwise, return false.

而Number.isNaN则不一样
> When Number.isNaN is called with one argument number, the following steps are taken:
> 
> 1. If Type(number) is not Number, return false.
> 2. If number is NaN, return true.
> 3. Otherwise, return false.


另外NaN还有一个特性就是，不等于自身
> A reliable way for ECMAScript code to test if a value X is a NaN is an expression of the form X !== X. The result will be true if and only if X is a NaN.


另外就是isFinite方法，全局的isFinite和Number.isFinite也是不一样的，区别和isNaN一样，全局的会先类型转换，Number.isFinite则是先类型判断
