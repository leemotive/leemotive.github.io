
### 移动过滤出来文件到指定目录
-t 是要输出要执行的命令, -I是要替换的内容
```shell
la | grep ^-rw- | awk '{print $9}' | xargs -t -I name  mv name ./test
```
