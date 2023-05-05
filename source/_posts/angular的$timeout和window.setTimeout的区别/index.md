---
title: "angular的$timeout和window.setTimeout的区别"
author: 柚子816
toc: true
comment: true
date: 2015-12-20 00:04:00
tags: 
  - angular
category: 前端
cover: 
---

这个问题也是前段时间面试的时候面试官问的，当时也只是略知一二，后来回来后查看的源码，才搞清楚

总结起来有以下几点：

1. 在$timeout中传入的函数会被包含在try...catch中，并且在异常时将异常交给$exceptionHandler
2. window.setTimeout返回的是数字id，可以通过window.clearTimeout(id)取消，而$timeout返回的是promise对象，要取消要用$timeout.cancel(返回的promise对象)  
3. $timeout传入的function会更新作用域内的数据绑定，也就是说在function中对$scope的修改会触发更新，而window.setTimeout中对$scope的修改不会触发更新。当然$timeout有第三个参数，默认为true，如果传入false，则不会更新当前作用域的数据绑定
   

当然$timeout的实现仍然是调用原生的window.setTimeout。那么是怎么实现的呢。看看源码就知道了。


​    
```js
function timeout(fn, delay, invokeApply) {
  var skipApply = (isDefined(invokeApply) && !invokeApply),
      deferred = (skipApply ? $$q : $q).defer(),
      //要返回的prosemise对象
      promise = deferred.promise,
      timeoutId;

  timeoutId = $browser.defer(function() {
    try {
      //这里调用了fn(),并且把返回值作为resolve的参数，如果对$timeout返回的promise对象调用的then方法，这里fn的返回值就可以用到了
      deferred.resolve(fn());
    } catch(e) {
      deferred.reject(e);
      $exceptionHandler(e);
    }
    finally {
      delete deferreds[promise.$$timeoutId];
    }
    //通过第三个参数来确定是否要执行$apply触发更新
    if (!skipApply) $rootScope.$apply();
  }, delay);
  //在timeoutId挂在promise对象上
  promise.$$timeoutId = timeoutId;
  deferreds[timeoutId] = deferred;
  //返回的promise对象
  return promise;
}
```

$browser.defer方法如下


​    
```js
self.defer = function(fn, delay) {
    var timeoutId;
    outstandingRequestCount++;
    //此处调用了原生的setTimeout并返回数字id
    timeoutId = setTimeout(function() {
        delete pendingDeferIds[timeoutId];
        completeOutstandingRequest(fn);
    }, delay || 0);
    pendingDeferIds[timeoutId] = true;
    return timeoutId;
};
```

在实际应用时如下

`var returnedPromise = $timeout(function(){return 'value';}, 2000);`

这里可以对returnedPromise调用then方法或者finally等方法  

`returnedPromise.then(resolveFun, rejectFun, progressFun)`

这时到时间后resolveFun这些方法也要执行

