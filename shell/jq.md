# jq

一个好用的在shell脚本里处理json的工具[jq](https://stedolan.github.io/jq/)

[安装方法](https://stedolan.github.io/jq/download/)

有时候在执行`echo $json | jq '.url'`这样的命令的时候会报
> parse error: Invalid string: control characters from U+0000 through U+001F must be escaped at line 2, column 1

这时候可以尝试`printf '$s' "$json" | jq '.url'`来尝试解决

上面这种方式等到的url字符串首尾是有引用的，可以使用`jq -r '.url'`来得到无引号的字符串
