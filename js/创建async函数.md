# 创建async函数

使用 new Function的方式动态创建的函数是无法在函数内部使用`await`关键字的, 如果需要创建async函数，可以如下操作

```js
const AsyncFunction = (async function(){}).constructor;
new AsyncFunction('a', 'b', 'return await Promise.resolve(a + b)');
```

