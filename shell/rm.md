# rm
用于删除目录及文件

但是稍有不慎，可能就错误删除不该删除的文件

可以通过echo命令来辅助检查rm命令的正确性
```
$ echo rm -rf *.json
rm package-lock.json package.json
```
可以看到将会删除两个文件，如果没有问题再去重新执行rm命令删除文件
