---
title: 这些个js新功能你用上了么
author: 柚子816
toc: true
comment: true
date: 2024-10-20 20:52:13
tags:
  - Javascript
category: 前端
cover: ./cover.jpg
---



每年都发布几个新功能，来看看目前确定的2025发布的功能有哪些



## 同名具名捕获组

曾几何时正则表达式中的捕获组是不支持命名的，只能按顺序获取。

```javascript
const matched = '2012-12'.match(/(\d{4})-(\d{2})/)
const [, year, month] = matched;
```

匹配结果matched是一个数组，数组第一项是正则匹配的完整的字符串，从第二项开始就依次是捕获组的内容，所有year和month分别是数组第二项，和第三项。



### 可以命名的捕获组

还是上面的例子

```javascript
const matched = '2012-12'.match(/(?<year>\d{4})-(?<month>\d{2})/)
const {year, month} = matched.groups
```

可以看到把匹配结果中增加了一个groups属性。并且使用了我们的捕获给名称作为键值。这就非常方便了，后续解构时也很方便，并不用区分对应的捕获组在正则中的位置，一旦正则调整，只要捕获组名称没有动，后面的解析就不需要更改。否则很可能出现动了正则，变更了捕获组顺序而不自知的事情。



既然捕获组在groups对象中是以其名称来作为键值的，那这就要求捕获组之间不能重名，否则在groups对象中要出现同名覆盖，丢失捕获组的情况了。

```javascript
'5987'.match(/([a-z]{4})|([5-9]{4})/);
// ["5987", undefined, "5987"]
```

第一个捕获没有匹配上，第二个捕获组匹配上了。如果这两个捕获组对我而言意义相同，这个时候是不能使用具名捕获组的，会报错

```javascript
'5987'.match(/(?<code>[a-z]{4})|(?<code>[5-9]{4})/);
// SyntaxError: Invalid regular expression: duplicate group specifier name
// 我电脑上的safari还不支持同名捕获组
```

当然上面这个问题你可以通过调整正则，在捕获组内使用`|` 来区分不同的匹配方式

### 同名捕获组

新功能就是解决这个问题的，只要能保证捕获组不会同时匹配到内容，就是可以使用相同的名称，那如何保证呢，自然是像上面那样使用`|` 把捕获组放在不同的分支下。看一下提案中使用的正则

```javascript
/(?<year>[0-9]{4})-[0-9]{2}|[0-9]{2}-(?<year>[0-9]{4})/
```

这个正则支持两种年月匹配模式**2024-10**或者**10-2024** 。使用 `|` 把两种模式区分开，确保不会同时被匹配上，也就杜绝了groups对象中同名覆盖的问题。

```javascript
const matched = '2024-10'.match(/(?<year>[0-9]{4})-[0-9]{2}|[0-9]{2}-(?<year>[0-9]{4})/);
const {year} = matched.groups;
// chrome 支持良好
```

不管是哪种形式的年月字符串，只要能被匹配上，都可以直接从groups对象中获取year



## 集合的新方法

- **intersection(other)**

  求交集，返回一个新集合，新集合的元素既在this集合中，也在other集合中

- **union(other)**

  求并集，返回一个新集合，新集合元素包含this和other中所有的元素

- **difference(other)**

  求差集，返回一个新集合，新集合元素在this集合中，但不在other集合中

- **symmetricDifference(other)**

  求对称差，返回一个新集合，新集合元素只在this集合中或只在other集合

- **isSubsetOf(other)**

  this集合是否为other集合的子集

- **isSupersetOf(other)**

  this集合是否为other集合的父集

- **isDisjointFrom(other)**

  this集合和other集合是否没有共同元素，也就是交集是否为空

有了这些方法，将大大简化我们的一些业务处理逻辑



## 正则修饰符

这次不是新增修饰符，而是修饰符功能增强

```javascript
/javascript/.test('Javascript')  // false
```

如果希望能够匹配上，也就是忽略大小写

```javascript
/javascript/i.test('Javascript')  // true
```

这样添加忽略大小写的修饰符就可以实现需求。但同时对于后面的字符也都忽略了大小写。*如果我的需求是只有首字符忽略大小写。其它的仍然要保持大小写敏感状态*，在以前单纯通过修饰符是不可能实现的。因为修饰符是针对整体正则表达式的，无法针对其中一部分。不过现在可以了

```javascript
/(?i:j)avascript/.test('Javascript')  // true
```

(?:)是非捕获分组，本次新功能就是在分组内调整修饰符。正则表达式整体是大小写敏感的，但是在分组内使用大小写不敏感模式。



本次新功能支持在分组中添加修饰符或者移除修饰符 `(?imsx-imsx:subexpression)`

可以看到支持 **imsx** 四种修饰符，使用**-**来标记是移除一个修饰符

> x 修饰符是不是看着有点陌生。对的，它还没成功标准，还在提案阶段
>
> https://github.com/tc39/proposal-regexp-x-mode



## Import Attributes

在原生不借助打包工具的情况下，是无法通过import语句导入一个json文件的。这个新功能就是解决这样一个问题的。

```javascript
import json from './test.json' with {type: 'json'};

console.log(json);
```

通过在导入语句后面添加 with 来标注更多信息，这里则是通过type来注明导入的是一个json文件。这样才可以正常的输出json内容。

当然也支持异步导入

```javascript
import('./test.json', { with: { type: 'json' } }).then(m => console.log(m.default));
```

这就厉害了，后续会不会支持各种其它的类型，然后都不需要打包工具了



## JSON modules

其实就是上面导入的json模块，后续也许还会有其它模块支持



## Iterator Helpers

这是给迭代器增加了一些方法，方便在处理迭代器的时候更加方便

```javascript
function* gen() {
  
}

var itr = gen();
```

这个itr只可以调用生成器的next, return, throw方法，迭代器上没什么可用方法，现在不一样了，迭代器上加了各种方法`drop`, `every`,`filter`, `find`, `flatMap`, `forEach`, `map`, `reduce`, `some`, `take`, `toArray` , `Iterator.from`

其中`Iterator.from` 是静态方法

上面的各种方法除了drop和take都跟数组很像，使用也很像。

而 take是只取前n个结果 ，drop是丢弃前n个结果



## Promise.try

这是给 Promise 又添加了一个新的静态方法, 其语法如下

>  Promise.try ( callbackfn, ...args )

第一个参数是要立即执行的函数，后面的参数是需要传给这个函数的，函数执行成功， try 得到的promise将会进行fulfilled状态，如果函数异步，try得到的promise进行rejected状态

