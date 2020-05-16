# json

用 json 模块处理

json.dumps 好比 js 里面的 JSON.stringify，将对象转化为字符串

jons.loads 好比 js 里面的 JSON.parse，将字符串解析为一个对象

如果是从文件里解析或者向文件写入数据可以使用 json.load 和 json.dump 两个方法

```python
userStr = json.dumps(user, indent = 2)
json.loads(userStr)
```

当然调用 dumps 的时候，还可以加上 `ensure_ascii=False` 不要将 中文进行 unicode 编码，还有 indent 参数控制格式化缩进

更多参数用法参考[python标准库](https://docs.python.org/3.7/library/json.html)

