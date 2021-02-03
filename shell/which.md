# which

这个命令用来在环境变量$PATH查找某个命令的文件位置，包括设置的alias

比如
```bash
$ which git
/usr/local/bin/git
```

但如果你两个文件，此时只能找到一个，需要加上-a选项
```bash
$ which -a cat
cat: aliased to bat
/bin/cat
```

