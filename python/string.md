# string

```python
"我是{}，今年{}，来自{province}, 现居{address}".format("张三", 34, address="安徽", province="江苏")

"我是{1}，今年{0}，来自{province}, 现居{address}".format(34, "张三", address="安徽", province="江苏")
```

还可以在占位符处设置格式及类型转化，详情请参考[python标准库](https://docs.python.org/zh-cn/3/library/string.html)

## 模板字符串

```python
from string import Template
tpl = Template("${name}来自哪？")
print(tpl.substitute(name = "吴六"))
```

类似于 js 里面的模板字符串

​	