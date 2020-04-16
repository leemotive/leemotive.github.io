在vue组件的template中
```html
<img :src="path/to/image">
```
这段代码在渲染成页面后，可能会成为以下这样的代码
```html
<img src="[object Module]">
```
解决这个问题请尝试在url-loader的options里添加`esModule: false`
