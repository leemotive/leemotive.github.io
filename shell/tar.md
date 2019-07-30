# tar

一个打包及解包的命令

常用选项
```
-c --create  创建新包
-v --verbose 显示指令执行过程
-f --file    指定包文件名
-x --extract --get  从现有包中解出文件
-t --list   列出包中的文件，但不解包
-r --append 向现有包中添加新文件
-u --update 更新包中的文件
-Z --compress --uncompress  通过compress命令进行压缩或者解压缩,结果文件一般为.tar.Z
-z --gzip --ungzip  通过gzip命令对包进行压缩或者解压缩，结果文件一般为.tar.gz
-j --bzip2   通过bzip2压缩或者解压缩, 结果文件一般为.tar.bz2
-X --exclude  过滤掉文件不进行打包
-C --directory  切换目录
```

. ./ 可以选中当前目录下所有文件

./*  只会选中非隐藏文件

.[!.]* 只选中隐藏文件(包括隐藏目录中的所有文件) 在命令行中直接输入时注意!需要转义
