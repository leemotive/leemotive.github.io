# debounce

防抖方法，在指定时间间隔内重复触发将重新计时
- fun为需要真正执行的方法
- delay指定时间间隔
- leading指定是否立即执行第一次
- trailing指定在计时结束后是否执行最后一次触发

```javascript
function debounce(fun, delay, {leading = true, trailing = false} = {}) {
  let timer = 0;
  return function(...args) {
    if (!timer && leading) {
      fun.call(this, ...args);
      timer = setTimeout(() => {
        timer = 0;
      }, delay);
      return;
    }
    timeout(this, ...args);
  }
  function timeout(context, ...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = 0;
      trailing && fun.call(context, ...args);
    }, delay);
  }
}
```
