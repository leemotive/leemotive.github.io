# radio

```html
<form>
  英语 <input type="radio" name="language" value="english">
  法语<input type="radio" name="language" value="french">
  中文<input type="radio" name="language" value="chinese">
</form>
```

对于这些 radiobutton 想通过 js 控制，可以通过 checked 属性，如

```js
document.querySelector('input:nth-child(1)').checked = true
```

如果可以勾选第一个，请不要用 `setAttribute` 设置 checked 属性

还有另外一种方式来设置

```js
document.forms[0].elements.language.value = 'chinese'
```

设置对应的值就可以选中对应的 radio

```js
document.forms[0].elements.language
// RadioNodeList(3) [input, input, input, value: "chinese"]
```

这是一个类数组对象，数字索引对应每个 radio，value 记录名为 language 的 radio 选中的值