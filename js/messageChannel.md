# messageChannel

**用法**
```javascript
var channel = new MessageChannel();
```

`channel`包含两个`MessagePort`对象，`port1`和`port2`。两个对象可以通过`postMessage`和`onmessage`发送及接收消息。

在port1上调用postMessage，在port2上通过onmessage接收消息

MessagePort对象可以通过`window.postMessage`的第三个参数传递给别的window对象，实现跨域通信
