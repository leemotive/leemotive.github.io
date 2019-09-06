# pointer-events

设置元素在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的target

- auto 和属性未设置的情况下表现一致
- none 标示元素不成为鼠标事件的target

其它值都只适用于svg，可参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)


设置none后，子元素也是不可以触发鼠标事件的，但是如果子元素将自己的poiner-events设置为auto之后，子元素仍然可以触发鼠标事件，而此时父元素可以通过捕获或者冒泡触发事件
