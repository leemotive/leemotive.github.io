# find
可以用find命令在目录下寻找一些文件，比如查找package.json文件
```bash
find . -name package.json
```

如果想排除某些目录下不想去搜索，比如node_modules目录，可以如下执行
```bash
find . -path "*/node_modules" -prune -o -name package.json
```

如此执行node_modules目录下的文件就不会被检查，但是这样执行，输出会包含node_modules目录本身
```
./packages/components/node_modules
./packages/components/package.json
```

此时可以添加-print参数
```bash
find . -path "*/node_modules" -prune -o -name package.json -print
```
