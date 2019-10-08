# throttle

节流方法
- fun为真正执行的方法
- deplay为两次执行时间间隔
- leading 第一次触发后是否立即执行
- trailing 计时结束后是否执行最后一次的触发

连续触发时，下一次的执行需要在上一次执行后指定时间以后才执行，指定的时间间隔内触发的执行在计时结束之后执行最后的一次触发

```javascript
function throttle(fun, delay, { leading = true, trailing = true } = {}) {
  let timer = 0;
  let latestArgs;
  return function(...args) {
    if (!timer && leading) {
      fun.call(this, ...args);
      timeout(this);
      return;
    }

    timeout(this, args);
  };

  function timeout(context, args) {
    if (trailing) {
      latestArgs = args;
    }
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      timer = 0;
      if (latestArgs) {
        fun.call(context, ...latestArgs);
        timeout(context);
      }
    }, delay);
  }
}
```
