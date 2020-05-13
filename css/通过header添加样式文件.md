# 通过header添加样式文件

这个功能测试后只在 firefox 浏览器生效，在 chrome, safari 下均没有效果

```js
const app = express();

app.get('/', function(req, res) {
  res.setHeader('Link', '<css.css>;rel=stylesheet')
  res.send(
    `
<html>
<body>
  <div>
    测试一下呢
  </div>
</body>
</html>
    `
  )
})

app.get('/css.css', function(req, res) {
  res.sendFile(path.resolve('css.css'));
})

app.listen('5000', function() {
  console.log('app started, visit http://localhost:5000');
})
```

在 firefox 浏览器里访问见面，发现会加载 css 文件，证明通过样式文件添加成功

更多解释请看 [Adding CSS to a Page via HTTP Headers](https://www.impressivewebs.com/adding-css-to-a-page-via-http-headers/)