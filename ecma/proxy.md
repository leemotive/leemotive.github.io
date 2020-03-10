# proxy

Proxy提供了创建一个对象的代理对象，拦截对象操作的方法。  
使用示例如下：
```javascript
var target = {
  value: 23
};
var handler = {
  get(target, name) {
    return target[name] + 1;
  }
}
var proxy = new Proxy(target, handler);

proxy.value // 24
```
这个每次获取value值的时候都会加1后再返回

目前handler共提供了13种拦截方法
`getPrototypeOf`, `setPrototypeOf`, `isExtensible`,`preventExtensions`, `getOwnPropertyDescriptor`, `defineProperty` ,`has`, `get`, `set`, `deleteProperty`, `ownKeys`, `apply`, `construct`

虽然提供了这13种拦截方法，但是方法的返回也是也是有一定要求的

1. getPrototypeOf  
    - 返回值只能是Object或者null
    - 如果目标对象(target)是不可扩展的，那拦截方法返回值的必须和直接操作目标对象的返回值是一样的
2. setPrototypeOf  
    - 返回值必须是布尔值
    - 如果目标对象是不可扩展的，那这个方法的参数和对目标对象调用getPrototypeOf的返回值必须是一样的
3. isExtensible  
    - 返回值必须是布尔值
    - 值和目标对象的值返回需要致
4. preventExtensions  
    - 返回值必须是布尔值
    - 只有在目录对象不可扩展的时，才可以返回true
5. getOwnPropertyDescriptor  
    - 返回值必须是Object或者undefined
    - 如果在目标对象上属性存在且不可配置，则方法不可以返回属性不存在
    - 如果在目标对象上忏悔存在，且目标对象是不可扩展的，则方法不可以返回属性不存在
    - 如果目标对象不可扩展，那只有属性是目标对象自有属性，方法才可以返回true
    - 只有在目标对象上属性是不可配置的，才可以返回属性不可配置
    - 只有在目标对象上忏悔是不可配置不可写的，才可以返回属性不可配置不可写
6. defineProperty  
    - 返回值必须是布尔值
    - 目标对象不可以扩展时，属性不可以被添加
    - 属性不可被设置为不可配置，除非目标对象上属性就是不可配置的
    - 不可配置的属性不可以被设为不可写，除非目标对象上的属性是不可配置不可写
7. has  
    - 返回值必须是布尔值
    - 如果属性在目标对象上是不可配置的，那返回值不可以为false
    - 如果属性是目标对象的自有属性且目标对象不可扩展，那返回值不可以是false
8. get  
    - 如果在目标对象上是不可写不可配置的，返回值必须和目标对象上的值一致
    - 如果属性在目标对象上是不可配置且get函数为undefined的时候，方法必须返回undefined
9. set  
    - 返回值必须是布尔值
    - 如果目标对象上是不可配置不可写的，那不可以设置为其它的值
    - 如果目标对象上属性是不可配置，没有set的访问器属性，则不可以设置此属性的值
10. deleteProperty  
    - 返回值必须是布尔值
    - 如果属性是不可配置的，则不可以返回已删除
    - 如果属性存在且目标对象不可扩展，则不可以返回已删除
11. ownKeys  
    - 返回值必须是List
    - 返回List里面不可以有重复值
    - List里面的每个元素必须是字符串或者Symbol
    - List里面必须包含目标对象上不可配置的属性
    - 如果目标对象不可扩展，那结果List必须包含目标对象上的所有属性，且不可以有其它值，即使目标上属性是不可以枚举的也要返回
12. apply  
    - 只有在目标对象可以作为方法调用的时候，才有这个拦截方法
13. construct  
    - 只有在目标对象可以作为构造器的时候，才有这个拦截方法
    - 这个拦截方法的结果必须是个对象
