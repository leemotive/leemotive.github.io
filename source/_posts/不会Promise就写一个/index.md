---
title: 不会Promise?那就写一个
author: 柚子816
toc: true
comment: true
date: 2024-02-22 21:10:34
tags:
  - Promise
  - js
category:
  - 前端
cover: ./cover.jpeg
---

你是否在面对 Promise 面试题时总是搞不清他们的输出顺序，是不是想征服 Promise, 那你来对的，这里将实现一个 Promise, 以此来理解Promise的原理



## Promise 是什么

要想实现一个 Promise，首先要知道 Promise 是什么吧，它其实就是一个对象，内部维护了一个状态，结果，及回调函数列表。在状态发送改变时，使用结果作为参数去调用回调函数。Promise 在刚创建的时候其状态是`pending` (等待中)，当达到一定条件后状态发生变更，可以变为`fulfilled`（完成）或者 `rejected`（失败），根据变更后状态，调用不同的回调函数。而一旦状态发生变更，将无法再变更为其它状态。所以 Promise 本质上还是在使用回调函数，所以Promise是无法从根本上解决回调地狱的问题的。

> 上面讲的这些其实是有一个规范的，就是 [Promises/A+](https://promisesaplus.com/) ，这是一个社区规范，它并不是 ECMAScript 的标准，在 js 引入 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 这个 api 之前，社区里就已经有很多不同的符合规范的实现了，而 JS 最后也采用了这种规范。有兴趣的可以阅读一下这个规范可以帮助我们更好的理解Promise



## 构造函数

要创建 Promise 对象，那就从类定义及构造函数开始吧

```typescript
// 一堆类型声明
type AnyFunction<T = any> = (...args: any[]) => T;
interface PromiseExecutor<V, R> {
  (resolve: (value: V) => void, reject: (value: R) => void): void;
}
type PromiseStatus = 'pending' | 'fulfilled' | 'rejected';
interface PromiseHandler<T = any> {
  (v: T): any;
}

class MyPromise<V = any, R = any> {
  // 成功的回调函数列表
  #onFulfilledCallbacks: AnyFunction[];
  // 失败的回调函数列表
  #onRejectedCallbacks: AnyFunction[];
  // promise 的状态
  #status!: PromiseStatus;
  // 成功后的值
  #value!: V;
  // 失败的原因,其实可以和 value 使用同一字段的，毕竟这两个字段最后只会用一个
  #reason!: any;
  // 触发状态变成 fulfilled 的函数
  #resolve = (value?: V) => {};
  // 触发状态变成 rejected 的函数
  #reject = (reason?: any) => {};

  constructor(executor: PromiseExecutor<V, R>) {
    this.#onFulfilledCallbacks = [];
    this.#onRejectedCallbacks = [];
    this.#status = 'pending';
    try {
      // 在构建函数中立即执行 executor 这个回调函数，这就解释了在 new Promise(function() {}) 时
      // 会同步执行函数的原因
      executor((value?: V) => innerResolver(this, this.#resolve, this.#reject, value), this.#reject);
    } catch (e) {
      // 如果执行函数过程中发生了异常，将 promise 变更为失败状态
      this.#reject(e);
    }
  }
}
```

看代码就行，注释应该算是蛮清楚的了



## #resolve和#reject

这两个函数是在类内部变更 promise 状态的，所以使用的私有字段，包括上面的回调函数列表，状态，值，原因等字段都是内部字段，不允许在类外部进行随意更改

```typescript
class MyPromise<V = any, R = any> {
  #resolve = (value?: V) => {
    if (this.#status === 'rejected') {
      // 如果已经是失败状态了，则什么也不用做，直接退出。规范上是不允许状态二次变更的
      return;
    }

    if (this.#status === 'pending') {
      // 如果还是在等中则变更状态并记录结果
      this.#value = value!;
      this.#status = 'fulfilled';
    }
		// 取出所有成功的回调函数依次调用
    const callbacks = this.#onFulfilledCallbacks.splice(0);
    // 并不是直接就调用，而是将回调函数推入微任务列表，等待系统调度执行
    callbacks.forEach(fn => queueMicrotask(() => fn(this.#value)));
  };

  #reject = (reason?: any) => {
    // 和上面一样，只不过这个函数是需要将状态变成 rejected, 所以状态判断逻辑和使用的回调函数队列略有差异
    if (this.#status === 'fulfilled') {
      return;
    }
    if (this.#status === 'pending') {
      this.#reason = reason;
      this.#status = 'rejected';
    }

    const callbacks = this.#onRejectedCallbacks.splice(0);
    callbacks.forEach(fn => queueMicrotask(() => fn(this.#reason)));
  };
}
```



## 原型方法 then, catch, finally

then 方法是 Promise/A+ 规范中明确指明需要有的方法，它接收两个回调函数，一个在成功后执行，一个在失败是执行。在面试过程中见过太多的人并不知道 then 还可以接收第二个回调函数处理失败的情况。这也是我为什么会写这篇文件的原因之一。在日常工作中确实 then 一般只会接收一个成功的回调函数，处理失败的情况一般都是用 catch 的，但是他们并不一样。



```typescript
class MyPromise<V = any, R = any> {
  // 两个回调函数，一个在成功后执行，一个在失败后执行
  then(onFulfilled?: PromiseHandler<V>, onRejected?: PromiseHandler) {
    const { promise, resolve, reject } = MyPromise.withResolvers();

    // 将 onFulfilled 和 onRejected 分别推入对应的回调函数列表，等待在 promise 状态发生变更时调用
    pushCallback(promise, this.#onFulfilledCallbacks, onFulfilled, resolve, reject, true);
    pushCallback(promise, this.#onRejectedCallbacks, onRejected, resolve, reject, false);

    if (this.#status === 'fulfilled') {
      // 如果 promise 已经成功状态，调用这个方法可以将成功回调函数推入微队列
      this.#resolve();
    } else if (this.#status === 'rejected') {
      // 如果 promise 已经失败状态，调用这个方法可以将失败回调函数推入微队列
      this.#reject();
    }
		// 返回新的 promise 以支持链式调用
    return promise;
  }
}
```

这段代码用到了一个新的 api `Promise.withResolvers` 可以参考我之前的一篇文章 [Promise这个新api有点香](https://juejin.cn/user/1253906685632727/posts)



`pushCallback` 是一个工具函数，用于将回调函数推入对应的列表

```typescript
function pushCallback(
  p: MyPromise,
  callbackQueue: AnyFunction[],
  handler: AnyFunction | undefined,
  resolve: AnyFunction,
  reject: AnyFunction,
  sign: boolean,
) {
  // 如果回调函数，就给个默认函数，
  if (typeof handler !== 'function') {
    // eslint-disable-next-line no-param-reassign
    handler = sign
      ? r => r
      : r => {
          throw r;
        };
  }
	// 实际保存在列表中的是一个包装过的函数，内部有一些处理逻辑，
  // 比如异常时，还有函数执行结果是另一个Promise, 或者 thenable 对象的时候
  callbackQueue.push(result => {
    let nextResult;
    try {
      // 调用对应的回调函数
      nextResult = handler!(result);
    } catch (e) {
      // 异常时直接变更 promise 为失败状态
      reject(e);
    }
    // 这是另一个内部工具方法，在 promise/A+ 规范也有提到这个方法，主要用来处理回调函数的结果的，根据结果决定状态如何发生变化
    innerResolver(p, resolve, reject, nextResult);
  });
}
```

`innerResolver` 方法用来实现规范中 **\[[Resolve]]\(promise, x)** 的功能，对回调函数的执行结果进行分类判断

```typescript
function innerResolver(promise2: MyPromise, resolve: AnyFunction, reject: AnyFunction, x: any) {
  if (x === promise2) {
    // 如果返回结果就是 promise 本身，这是不允许的，如果这么做promise将无法变更状态，所以这种情况直接将状态置为失败
    reject(TypeError('can not resolve promise self'));
  } else if (x instanceof MyPromise) {
    // 如果结果是一个新的 promise，那么 then 方法返回的 promise 的状态将和这个新 promise 的状态保持一致
    // 所以这里使用 x.then 的方法，在 x 的状态发生变更后，去决定 promise 的状态
    x.then(
      // 如果 x 成功，需要递归处理
      y => queueMicrotask(() => innerResolver(promise2, resolve, reject, y)),
      // 如果 x 失败，直接将 promise 也失败
      r => reject(r),
    );
  } else if (x && ['object', 'function'].includes(typeof x)) {
    // 这个 race 用于保证 thenable 对象的回调函数及错误处理不会重复执行，且只会执行一次，race 的代码下面会给出
    const race = getRace();
    try {
      const { then } = x;
      // 如果回调执行结果是 thenable 对象，也需要类似处理
      if (typeof then === 'function') {
        then.call(
          x,
          race(y => innerResolver(promise2, resolve, reject, y)),
          race(r => reject(r)),
        );
      } else {
        // 结果非 thenable 对象是，变更状态为成功
        resolve(x);
      }
    } catch (e) {
      // 有异常时变更状态为失败
      race(() => reject(e))();
    }
  } else {
    // 其它结果类型，变更状态为成功
    resolve(x);
  }
}
```

 `race` 方法用于让多个函数产生竞争关系，一旦有一个函数被执行后，其它函数将不再会被调用，且第一个被调用的函数也不会被二次调用

```typescript
function getRace() {
  let called = false;
  // 返回的这个函数就是上面代码用到的 race， 通过这个race 添加多少竞争函数，功能简单就不解释了
  return (fn: AnyFunction) =>
    function proxyFun(this: any, ...args: any[]) {
      if (called) {
        return undefined;
      }
      called = true;
      return fn.call(this, ...args);
    };
}
```



上面就是 then 方法相关逻辑，也是 promise 中最为重要的逻辑，下面 **catch** 方法可以说就是then 的简写而已

```typescript
class MyPromise<V = any, R = any> {
  catch(onRejected?: PromiseHandler) {
    return this.then(undefined, onRejected);
  }
}
```

**finally** 方法表示的是 promise 不管成功还是失败都需要执行，所以也可以简单的认为是 then 的简写，比如`finally(onFinally)` 就可以简单的认为是`then(onFinally, onFinally)` 的简写，但是在 ECMAScript 中的 finally 的功能却还完全是这样，它还有一些特殊逻辑，可以参考[Promise.prototype.finally()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) 中的介绍，总结起来就是 onFinally 回调函数不接收参数，finally 返回的新 promise 的状态变更逻辑要看看 onFinally 的执行结果，根据上面的 innerResolver 的方法逻辑，如果最新结果是失败，那 finally 返回 promise 的结果就是失败，否则和调用finally方法的那个 promise 的状态保持一致，且值/原因也是一致的。有点绕，自己理解一下，或者用代码跑一下看看结果吧

```typescript
class MyPromise<V = any, R = any> {
  finally(onFinally: () => any) {
    const p = this.then(onFinally, onFinally);
    const { promise, resolve, reject } = MyPromise.withResolvers();
    p.then(() => (this.#status === 'fulfilled' ? resolve(this.#value) : reject(this.#reason)), reject);
    return promise;
  }
}
```



## all, any, race, allSettled, withResolvers

Promise 除了上面的几个原型方法，还有几个静态方法。代码就不展示了，文末有项目代码的链接。

- **all** 用于在等待多个 promise 都完成的时候

- **any** 用于在多个 promise 中等待任意一个成功，如果都失败了，则新 promise 失败
- **race** 是赛跑机制，以多个 promise 中第一个发生状态变更的为准，新 promise 的状态和其保持一致
- **allSettled** 则是要等所有 promise 的状态都确定之后，不管是成功还是失败，所以新 promise 状态一定是成功的。在结果中会记录所有的 promise的状态及结果或者原因

**withResolver** 和上面的不一样，可以参考 [Promise这个新api有点香](https://juejin.cn/user/1253906685632727/posts)



## 测试

自己写完 promise 之后，当然需要测试一下是否符合 promise/A+ 的规范了，可以使用 [promises-aplus-tests](https://github.com/promises-aplus/promises-tests) ，这里就不演示测试代码了

**promises-aplus-tests** 只是测试了规范里提到的一些功能，catch, finally 及静态方法等并没有规范进行规定，所以没有测试，我自己写的 promise 项目也只是自己跟了一些代码看看结果是否和 ECMAScript 中的 Promise 是否一致，并没有严格去编写单元测试代码。如果有兴趣欢迎完善并指出代码里的问题



---



希望这篇文章对正在阅读的你有点价值。项目已经放在 github 上了，请参考 <nobr> [promise-implementation](https://github.com/leemotive/promise-implementation) </nobr>



这里留下一个问题：

```typescript
Promise.resolve(a).then(onFulfilled, onRejected1)
Promise.resolve(a).then(onFullfiled).catch(onRejected2)
Promise.resolve(a).then(onFullfiled, onRejected3).catch(onRejected4)
```

这里的写法有何区别，这些失败回调函数都能处理哪些异常，请留下你的答案



