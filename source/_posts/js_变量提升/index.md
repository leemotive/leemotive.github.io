---
title: "js 变量提升"
author: 柚子816
toc: true
comment: true
date: 2014-10-27 11:55:00
tags: 
  - JavaScript
keywords:
  - 变量提升
category: 前端
cover: 
---

想起来前段时间面试的时候遇到个问题，是关于变量提升的，记不得当时怎么答的了，今天再记一下


​    
```js
var k = 9;
function hoist(){
  k = 8;
  console.log(k);
}
hoist();
console.log(k);
```

这里两次console.log输出k 结果是两次输出8，在hoist方法内部的 k 引用的是函数外部定义的 k ， 不难理解


​    
```js
var k = 9;
function hoist(){
  var k = 8;
  console.log(k);
}
hoist();
console.log(k);
```

这里两次输出 k ， 结果是 8 和 9。hoist方法内部定义了局部变量并赋值8，全局变量k仍然是9。


​    
```js
var k = 9;
function hoist(){

  console.log(k);
  var k = 8;
  console.log(k);
}
hoist();
console.log(k);
```

这里hoist方法内部先输出 k ，然后定义局部变量，此时不要以为第一次的 k 是全局变量或者是后面的局部变量8。正确结果是undefined， 然后 是
8， 最后输出的是 9。

原因是javascript的变量声明具有hoisting机制。上面的代码相当于下面的代码


​    
```js
var k = 9;
function hoist(){
  var k;
  console.log(k);
  k = 8;
  console.log(k);
}
hoist();
console.log(k);
```

这样就好理解多了。

其实就是相当于把变量定义提升到顶部，但是初始化过程不会被提升。

函数也有类似过程


​    
```js
function hoist(){
  inner();
  function inner(){
    console.log('inner');
  }
}
hoist();
```

代码书写上调用inner的时候这个函数其实还没定义， 但是依然能正确调用，输出 ‘inner’


​    
```js
function hoist(){
  inner();
  var inner = function(){
    console.log('inner');
  }
}
hoist();
```

这里采用函数表达式 的方法定义一个函数，这里提示 ‘inner is not a function’

这种情况可以参考变量提升。相当于以下代码


​    
```js
function hoist(){
  var inner;
  inner();
  inner = function(){
    console.log('inner');
  }
}
hoist();
```

这样也就 好理解了

