# storage

`localStorage` 和 `sessionStorage`

localStorage是长久存储的，浏览器关闭也还会存在，数据是共享的

sessionStorage是临时的，当前tab页关闭后就消失，不同页面之间数据不共享



通过localStorage再更改数据之前会触发 storage事件，事件是绑在window对象

```js
window.addEventListenter('storage', function(e) {
	// storage里的数据发生变化
})
```

