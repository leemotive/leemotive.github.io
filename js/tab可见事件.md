# tab可见事件
在多tab浏览器中如果希望在tab之间切换时做一些操作，可以使用hidden事件
```javascript
var hiddenProperty = 'hidden' in document ? 'hidden' :
  'webkitHidden' in document ? 'webkitHidden' :
    'mozHidden' in document ? 'mozHidden' :
      null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function (e) {
  console.log('e', e);
  if (!document[hiddenProperty]) {
    console.log('页面激活');
  } else {
    console.log('页面非激活')
  }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
```
