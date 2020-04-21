# grep

## 一些常用选项
反选 -v  

整词匹配 -w  

显示匹配行的上下文 -C  

只显示前文 -B  

只显示后文 -A  

只是显示过滤后总的行数 -c  

在行头显示过滤出来行的行号(从0开始) -n  

使用正则匹配模式 -e 正则内容需要注意转义符  

忽略大小写 -i  

最多显示行数 -m 只显示前m行  

递归 -r, -R, --recursive

包含文件 --include  相对的还有 --exclude，并且 --exclude 的优先级更高  

包含目录 --include-dir 相对的还有 --exclude-dir，并且 --exclude-dir 的优先级更高  


### 在目录下文件里寻找
```bash
$ grep -rn "Tool" ./*
```
-r, -R, --recursive 递归子目录内文件
-n 显示结果所在行

### 过滤后同时显示标题
比如查看进程时
```bash
# 使用多个-e参数分别过滤
$ ps -ef | grep -e 第一行关键字 -e 过滤内容
# 或者使用两次过滤
$ ps -ef | head -1; ps -ef | grep 过滤内容
```

### 过滤指定文件
```bash
# 在java文件内进行查找
$ grep -r --include "*.java" controller ./
```
