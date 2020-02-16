# archive

如用压缩归档工具对工作区文件打包，不小心会把无用的文件打包，比如忽略文件，一些临时文件

- 基于最新提交建立归档文件
```bash
$ git archive -o latest.zip HEAD
```

- 只归档部分文件
```bash
$ git archive -o partial.tar HEAD src doc
```

- 基于tag:v1.0建立归档，并且为归档文件添加目录1.0
```bash
$ git archive --format=tar --prefix=1.0/ v1.0 | gzip > program-1.0.tar.gz
```
