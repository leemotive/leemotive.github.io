---
title: "函数递归"
author: 柚子816
toc: true
comment: true
date: 2014-12-19 22:28:00
tags: 
  -	js
keywords:
  - 递归
  - arguments
  - callee
category: 前端
cover: 
---

以斐波那契数列为例来讲讲递归


​    
```js
function fibonacci(n){
    return n < 3 ? 1 : fibonacci(n-1) + fibonacci(n-2);
}
console.log(fibonacci(6));
```

上面的定义了函数fibonacci并在内部调用自己形成递归，上面的调用正确输出8

但是曾经有文章介绍说这样写有问题，就是当在函数外面fibonacci被覆值了怎么办？


​    
```js
function fibonacci(n){
    return n < 3 ? 1 : fibonacci(n-1) + fibonacci(n-2);
}
var fun = fibonacci;
fibonacci = 'not a function';
console.log(fun(6));
```

这时fun保存着对原有函数的引用可以调用，但是函数内部fibonacci已不是函数

Uncaught TypeError: string is not a function

可见函数已经不能正常运行，怎么办，文章里介绍了用arguments.callee来实现递归

arguments.callee表示的是正在执行的函数本身


​    
```js
function fibonacci(n){
    return n < 3 ? 1 : arguments.callee(n-1) + arguments.callee(n-2);
}
var fun = fibonacci;
fibonacci = 'not a function';
console.log(fun(6));
```

如此在函数内部不再通过fibonacci这个名字来调用，如此不管函数外部怎么把fibonacci改成什么，函数依旧可以正常运行，输出8

可是这样没问题了么，如果是在严格模式下怎么办，严格模式下，是不让用callee的


​    
```js
'use strict'
function fibonacci(n){
    return n < 3 ? 1 : arguments.callee(n-1) + arguments.callee(n-2);
}
var fun = fibonacci;
fibonacci = 'not a function';
console.log(fun(6));
```

这里运行结果是

Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be
accessed on strict mode functions or the arguments objects for calls to them

可见callee已经不能用了，那要如何解决呢，今天提供一个方法，如下


​    
```js
'use strict'
var fibonacci = function b(n){
    return n < 3 ? 1 : b(n-1) + b(n-2);
}
console.log(fibonacci(6));
```

函数正常运行，没有问题

即使在函数外部对fibonacci或者b赋值，都不会影响函数的执行


​    
```js
'use strict'
var fibonacci = function b(n){
    return n < 3 ? 1 : b(n-1) + b(n-2);
}
var fun = fibonacci;
fibonacci = 'not a function';
console.log(fun(6));
```

没有问题，正确输出，这里函数外部是无法直接引用b的，如果在函数外部执行 b='jhgf'; 这样的语句的话结果肯定告诉你 Uncaught
ReferenceError: b is not defined

当然如果你在函数内部写 var b = '我是来搞破坏的'; 导致函数无法正确运行，那我就无话可说了

