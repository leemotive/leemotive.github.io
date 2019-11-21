# array

## Array.from(arrayLike[, mapFn[, thisArg]])
类似数组或可迭代对象创建一个新的，浅拷贝的数组实例


## Array.of
参数依次排列组成一个数组，没怎么使用过

## copyWithin(target[, start[, end]])
浅复制数组中的一部分到数组中的另一个位置。没怎么使用过
```javascript
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
arr.copyWithin(1, 3, 5);
// ["a", "d", "e", "d", "e", "f"]
```

## every(callback[, thisArg])
除了第一个参数是回调函数，还有第二个函数指定回调函数的this

filter, find, findIndex, forEach, map, some, flatMap等方法也有同样的第二个参数

## fill(value[, start[, end]])
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素

## flat([depth])
扁平化一个数组, depth指明深度


## flatMap
相当于先map，结果再flat

## includes
有第二个参数formIndex, indexOf, lastIndexOf方法同样

## keys
返回一个迭代器，返回的是数组索引

## sort
- 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变;(不保证)
- 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前;
- compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的

