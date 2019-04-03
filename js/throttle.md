# throttle

节流方法
- fun为真正执行的方法
- deplay为两次执行时间间隔

连续触发时，下一次的执行需要在上一次执行后指定时间以后才执行，指定的时间间隔内触发的执行在计时结束之后执行最后的一次触发

```javascript
function throttle(fun, delay) {
  let timer = 0;
  let lasttime = 0;
  return function(...args) {
    const now = Date.now();
    const duration = now - lasttime;
    if (duration >= delay) {
      fun.call(this, ...args);
      lasttime = now;
      return;
    }

    timeout(this, duration, ...args);
  }

  function timeout(context, duration, ...args) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      lasttime = Date.now();
      fun.call(context, ...args);
    }, delay - duration);
  }
}
```
