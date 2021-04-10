# Split



可以将文件切割为指定大小的块，有点类似于分卷功能，在传输文件时，如果遇到工具有单个文件大小上限可以使用些功能进行分块传输

```bash
$ split -b 1m full.zip full.zip.
```

将会生成 `full.zip.aa` `full.zip.ab` 等文件

拿到所有分块文件再通过命令合并为一个完整的文件

```bash
$ cat full.zip.* > full.zip
```

