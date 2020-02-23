# postMessage

**window.postMessage** 方法可以在两个window对象之间进行安全跨域通信。如页面和这个页面打开的新页面，页面和内面内的iframe之前

**用法：**
```javascript
targetWindow.postMessage(message, targetOrigin, [transfer]);
```

- targetWindow    
    将要接收消息的window对象，获得对象的方法有
    - window.open方法的返回值，指向此方法打开的窗口的window对象
    - window.opener 指向打开当前页面的那个窗口的window对象
    - HTMLIFrameElement.contentWindow 指向页面iframe的window对象
    - window.parent 包含此iframe的那个页面的window对象
    - window.frames[index] 当前页面里的第几个iframe或者frame的window对象
- message    
    需要传递的消息，使用[结构化克隆算法](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
- targetOrigin    
    targetWindow所在的域(scheme, hostname, port)或者 `*`。
    
    > Always provide a specific targetOrigin, not *, if you know where the other window's document should be located. Failing to provide a specific target discloses the data you send to any interested malicious site.
- transfer[optional]  
    一个[Transferable](https://developer.mozilla.org/en-US/docs/Web/API/Transferable)对象组成的序列，和消息一同被传递给targetWindow。一旦被传递后，在当前环境下这些对象就变得不可用


targetWindow需要在自己页面监听消息事件
```javascript
window.addEventListener('message', function(event) {});
window.onmessage = function(event) {};
```
event重要属性
- data  
    传递过来的message
- origin  
    发送消息的窗口的域，
- source  
    发送消息的window对象
- ports  
    随消息一同传送过来的Transferable对象系列
