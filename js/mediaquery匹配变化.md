# MediaQuery匹配变化

在 css 中经常会使用 `@media` 在不同条件下做不同的样式渲染，比如下面这段代码

```css
@media screen and (max-width: 700px) and (min-width: 600px) {
  
}
```

上面这段代码指明浏览器窗口在 600px 到 700px 之前的时候才会应用里面的样式，那么如果想要在切换样式的同时要执行一段 js 代码完成特定的操作如何实现呢？这就要使用到 matchMedia 这样方法了

```js
const query = window.matchMedia('(max-width: 700px) and (min-width: 600px)');
query.matches // true or false

query.addEventListener('change', function(mediaQueryListEvent) {
  
})
// 或者
query.onchange = function(mediaQueryListEvent) {

}
```

如此可以不必监听 resize 事件，然后频繁计算了

