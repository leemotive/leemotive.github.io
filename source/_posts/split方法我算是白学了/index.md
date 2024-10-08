---
title: split方法我算是白学了
author: 柚子816
toc: true
comment: true
date: 2024-09-23 10:51:13
tags:
  - split
  - string
category: 前端
cover: ./cover.jpg
---



wc，同志们，javascript中字符串的split方法会用么。我最近发现我是白用这么多年了，导致我刷题时遇到一个问题死活没看出来是什么原因。今天必须要记录一下。如果你也和我一样，那在评论区留言，让我好受一点。



在说问题之前先来看一下`split` 最基本的两种应用



## 字符参数

split 方法是用来做字符串分割的，使用这个方法最常用的形式也是使用指定字符来对原字符串进行分割。比如下面的代码

```javascript
'as:st:vii'.split(':') 
// ['as', 'st', 'vii']
```

使用 `:` 对原字符串进行分割，结果是一个数组，这应该是平时用的比较多的用法了



## 正则参数

有时候用来的分割并不是特定的字符，而是一类字符，比如数字分割

```javascript
'as2st3vii'.split(/\d/)
// ['as', 'st', 'vii']
```

正则`\d` 表示所有数字，只要是数字就认为是一个分割符，这就非常灵活了。



---



以上就是基本的应用了，那怎么又说白学了呢。来看下面的代码，

```javascript
`asabstcdvii`.split(/(ab|cd)/)
```

思考一下结果是什么？用字符串ab或者cd分割，如果你觉得返回值是`['as', 'st', 'vii']`那请去评论区反省一下。

```javascript
// ['as', 'ab', 'st', 'cd', 'vii']
```

这才是正确结果，把分割符ab，cd也一并返回了，如果你回答对了，去评论区秀一把吧，反正我当年没学到这个功能。只能怪当年学习的时候不知道还有[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)。

简单解释一下，在正则表达中如果出现了捕获组, 那么这些捕获组的内容也会在结果中返回



如果我们把正则瞎改改，改的复杂一点。

```javascript
`asabstcdvii`.split(/(a|c)(b|d)/)
// ['as', 'a', 'b', 'st', 'c', 'd', 'vii']
```

可以看出来，正则表达式中所有的捕获组都会在结果数组中返回。

那这种功能有什么用呢。我也没有实现应用场景，毕竟以前根本不知道这个功能。下面这是硬想出来的功能代码

```javascript
function addYear(date) {
  const arr = date.split(/(-|\/)/);
  arr[0] = Number(arr[0]) + 1;
  return arr.join('');
}
```

如果日期字符串分割符可能是 `-`也可能是 `/` 如果不使用捕获组在字符串分割之后，就无法方便的辨别原字符串中的分割符是什么了



---

先别走，还没完。除了这些，这个split方法还支持第二个参数 limit，限制结果数组的长度。

```javascript
`asabstcdvii`.split(/(a|c)(b|d)/, 2);
// ['as', 'a']
```

看出来就是取没limit参数的结果数组的前几项。听起来比较拗口。自己理解一下吧，我讲不清楚



