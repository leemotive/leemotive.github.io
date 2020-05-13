# Infinity

一个无穷大的数字，对应  `Number.POSITIVE_INFINITY`，当然有无穷大就有无穷小，对应 `Number.NEGATIVE_INFINITY` 

在 Number 对象上有一个 `MAX_VALUE` 属性，任何大于这个值数字都会返回 Infinity

```js
Number.MAX_VALUE // 1.7976931348623157e+308
1.7976931348623159e+308 // Infinity
```

请不要尝试 `Number.MAX_VALUE + 1` 受精度影响，加了跟没加一样 

```js
Number.MAX_VALUE + 1 === Number.MAX_VALUE // true
```

有 `Number.MAX_VALUE` 自然就有 `Number.MIN_VALUE`, 不要认为它们是相反数，`Number.MIN_VALUE` 是一个极小的浮点数，它依然是正数

```js
Number.MIN_VALUE // 5e-324
```



没有参数的 `Math.max 和 Math.min` 方法调用返回也是无穷

```js
Math.max() // -Infinity
Math.min() // Infinity
```



当然判断一个数是不是无穷的，可以用一个叫 `isFinite` 的方法，分别有 `window.isFinite` 和 `Number.isFinite`，可以查看它们的[区别](./isNaN.md)

在进行 `JSON.stringify` 的时候 Infinity 会被转化为 `null`，所以无法反过来进行 parse 操作。这一点和 NaN 是一致的