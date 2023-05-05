---
title: 数组排序的新打开方式
author: 柚子816
toc: true
comment: true
date: 2023-04-01 11:01
tags:
  - javascript
  - array
  - sort
category: 前端
cover: ./download.png
---


js数组给我们提供了很多非常有用的方法，可以让我们的代码更简洁。其中之一就是它的排序方法`Array.prototype.sort`。什么冒泡排序，快速排序……这些排序算法还能记得多少？反正我是基本不用了。排序我就认**sort**。请看下面这个排序逻辑
```js
users.sort((a, b) => {
  if (a.name !== b.name) {
    return a.name > b.name ? 1 : -1
  }
  return a.age - b.age;
})
```

## 问题

上面代码的排序规则是先按姓名升序排列，姓名相同的按年龄升序排列。可是你能一眼就看出来这个排序规则么。在你每次去写排序的时候，是否有纠结应该返回1，还是-1。到底返回哪个值是升序，哪个是倒序呢。**是不是随便写一个，如果发现顺序不对，把 1 和 -1 换一下就好，也不是天天排序，懒的区分**。那有没有一种更加简单的试呢，能够简洁明了的指定排序方式，有如 **sql 语句**那样
```sql
SELECT * FROM user ORDER BY name ASC, age ASC
```

## 新打开方式

这里借用 [yatter](https://www.npmjs.com/package/yatter) 中的 **sorter** 方法来实现我们想要的功能

```js
import {sorter} from 'yatter';

users.sort(sorter(a => [a.name, a.age], 'asc'));
```
是不是更加简单，更加易懂。**sorter** 第一个参数是函数，将需要排序的字段按先后顺序组成一个数据返回，第二个参数指定升序或者降序。如果多个字段排序方向不同，可以使用数组
```js
users.sort(sorter(a => [a.name, a.age], ['asc', 'desc']));
```
如此则是先按姓名升序，再按年龄降序排列

## 应用

上面例子都很简单，都是直接按某个字段比较排序就可以，如果需要综合多个字段，或者字段本身是没法排序的。就需要稍微处理一下了

1. 按总分排序，总分相同按学号升序
    ```js
    users.sort(sorter(a => [a.ch + a.en + a.ma, a.id], ['asc', 'asc']));
    ```
    将多科成绩加起来作为第一排序维度，学号作为第二排序维度
2. 车牌排序 
    如果有一堆车牌，需要按城市排序（地级市），以江苏各城市为例，十三个地级市，车牌从 A 到 N。 另外苏州还多一个 U, 如此就不能简单按这个字母排序了，否则 U 会被排到最后。我们需要将苏U 和苏E 同等对待。假如数组中的对象的 city 字段保存的这些城市的字母编码
    
    ```js
    arr.sort(sorter(a => [a.city === 'U' ? 'E' : a.city], 'asc'));
    ```

----

怎么样？这样的数组排序会不会更加简单一些。yatter 中还有很多其它的实用函数，用起来吧。
