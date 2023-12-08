---
title: Promise这个新api有点香
author: 柚子816
toc: true
comment: true
date: 2023-12-08 17:54:48
tags:
  - Promise
  - withResolvers
category: 前端
cover: ./cover.jpg
---

不知道你有没有写过下面这样的代码

```js
let resolve, reject;

function init () {
	return new Promise((rs, rj) => {
    resolve = rs;
    reject = rj;
  });
}

function callback() {
  // ...异步什么异步操作
  resolve();  //或者 reject()
}
```

比如说我之前用到这种类似的代码的场景是这样，希望在打开一个弹窗后获得一个 promise, 在弹窗确认时通过 resolve 触发 promise 状态变成 `fulfilled`  ，在弹窗点击关闭/取消 通过reject触发 promise状态变成 `rejected` 由于弹窗组件已经封装好，事件注册也不是在调用 `init` 产生promise 的时候才注册的，在 callback 中无法获取 rs, rj 这两个局部变量，所以只能使用 resolve, reject 这两个外部变量来保存 rs,rj, 让外部函数可以使用这个内部函数



## Promise.withResolvers

今天在翻 ECMAScript Proposals 的时候，看到了 promise新出了一个 api，正好是用来解决上面这个问题的。

项目上面的代码没什么问题，只不过先定义两个变更 ，再在创建 promise 的时候保存这两个变量的写法有点影响心情。有太多地方需要在外部访问 promise 的这两个内部函数了。所以 promise 自己提供了这个 api 用法如下

```js
const {promise, resolve, reject} = Promise.withResolvers();

promise.then(/你的处理函数/)

// 在其它什么时候调用 resolve, reject
```



其实这个 api 内部也没干啥，看一下 ECMAScript specification 是怎么说的

>1. Let C be the this value.
>2. Let promiseCapability be ? [NewPromiseCapability](https://tc39.es/ecma262/#sec-newpromisecapability)(C).
>3. Let obj be [OrdinaryObjectCreate](https://tc39.es/ecma262/#sec-ordinaryobjectcreate)([%Object.prototype%](https://tc39.es/ecma262/#sec-properties-of-the-object-prototype-object)).
>4. Perform ! [CreateDataPropertyOrThrow](https://tc39.es/ecma262/#sec-createdatapropertyorthrow)(obj, "promise", promiseCapability.[[Promise]]).
>5. Perform ! [CreateDataPropertyOrThrow](https://tc39.es/ecma262/#sec-createdatapropertyorthrow)(obj, "resolve", promiseCapability.[[Resolve]]).
>6. Perform ! [CreateDataPropertyOrThrow](https://tc39.es/ecma262/#sec-createdatapropertyorthrow)(obj, "reject", promiseCapability.[[Reject]]).
>7. Return obj.

如果没有在不支持此 api 的浏览器上，可以写一个简单的 polyfill

```js
Promise.withResolvers = function() {
  let resolver, reject;
  const promise = new Promise((rs, rj) => {
    resolver = rs;
    reject = rj
  });
  return { promise, resolver, reject };
}
```





