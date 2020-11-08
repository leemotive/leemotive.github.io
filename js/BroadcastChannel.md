# BroadcastChannel

在同源情况下，不同页面之间传递消息相互通信的方案，当前要是同一浏览器，chrome和firefox之间肯定是不行的。不同tab及不同窗口之前是可以的。

```js
let channel = new BroadcastChannel('channel');
```

每个页面都执行以上代码，创建实例。需要发送消息的页面执行postMessage，需要接收消息的页面监听message事件

```js
// 消息发送
channel.postMessage('这是我的数据')
// 消息监听
channel.addEventListener('message', e => console.log(e));
```

在发送数据时，不会触发当前页面信息的监听事件。发送的消息不可以包含 function. 传递数据应该也是用了[结构化克隆算法](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) 

