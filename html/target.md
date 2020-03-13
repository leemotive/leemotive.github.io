# target

链接打开方式吧

- name 指定名字的窗口中打开
- _self 自身打开
- _blank 新窗口打开
- _parent 父窗口打开
- _top 顶层打开


```html
<a href="new.html" target="window_name">new window</a>
```
上面这段代码表示新开一个窗口打开`new.html`，同时新开的窗口被命名为`window_name`。这感觉有点类似于
```javascript
window.open('new.html', 'window_name');
```
这样如果当前页面还有其它的链接，或者`window.open`的第二个参数还是这个`window_name`，那么浏览器会在相同的窗口打开这个窗口

在新打开的窗口中通过`window.name`也能查看到新的窗口的name就是`window_name`，如果在新窗口中将`window.name`赋值为其它的值，则在链接页面有相应target属性值的链接会在这个窗口打开。但是如果自己打开的窗口修改`window.name`的值是没有效果的。新窗口一定是要通过之前的窗口通过`a`标签或者`window.open`打开才有效。


如果在frameset中，target属性还可以指定为某个frame的名字，用来指定在特定的frame中打开新页面

除了四个内置下划线开头的值，自定义的值不要用下划线开头
