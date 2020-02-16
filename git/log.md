# log

- 显示最近的几条日志`-<n>`, n为数字
```bash
$ git log -3 --pretty=oneline
```

- 显示改动
```bash
$ git log -p -1
```

- `-p`显示的信息较多，用`--stat`显示概要
```bash
$ git log --stat -1
```


- raw显示提交的原始数据，可以显示提交对应的树ID
```bash
$ git log --pretty=raw -1
```

- fuller同时显示作者和提交者
```bash
$ git log --pretty=fuller -1
```

- oneline提交精简的日志输出
