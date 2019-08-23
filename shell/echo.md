# echo

查看一个文件file通常是用cat命令，但是如果文件内容是特殊字符，比如表示颜色的编码，直接使用cat可以看起来乱糟糟的，这是可以使用echo命令

```bash
echo "$(cat file)"
```
或者
```bash
printf '%b\n' "$(cat file)"
```

其它的像`cat file | xargs echo `或者`` echo `< file` ``也能输出文件内容，但是兼容性不好，换行什么的没有表现出来
