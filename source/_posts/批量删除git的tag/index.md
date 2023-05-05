---
title: "批量删除git的tag"
author: 柚子816
toc: true
comment: true
date: 2016-07-06 21:50:00
tags: 
  - git
keywords:
  - 删除tag
  - 批量
category: 工具
cover: ./cf2963f1-a987-4c8e-a9aa-5b108a511c66.jpeg
---

git上发现突然多出来好多tag，这里就不说什么原因了，现在我只想把这些多出来的tag给快速删除了，然而git本身貌似没有这样的功能，所以要借助两个命令
awk 和 xargs 这两个命令的详细用法就不多做介绍了，这里只用来实现批量删除tag的命令

先说删除远程的tag 如果说只删除某个特定的tag 命令如下：


​    
```bash
git push origin :refs/tags/tag名字
```

如果要批量删除，首先要知道目前有哪些tag


​    
```bash
git show-ref --tag
```

大致会像这样显示出来

d47ce5327e0229e7c9393b8dd7ba58c071734170 refs/tags/dev_20150516_01

d47ce5327e0229e7c9393b8dd7ba58c071734170 refs/tags/dev_20150517_01

d47ce5327e0229e7c9393b8dd7ba58c071734170 refs/tags/dev_20160516_01

d47ce5327e0229e7c9393b8dd7ba58c071734170 refs/tags/dev_20160517_01

假如要删除的是 dev_20150516_01 dev_20150517_01

接下来就要借用 awk 来筛选出这两个tag了


​    
```bash
git show-ref --tag | awk '/2015/'
```

awk后面的正则表达式，显示如下

d47ce5327e0229e7c9393b8dd7ba58c071734170 refs/tags/dev_20150516_01

d47ce5327e0229e7c9393b8dd7ba58c071734170 refs/tags/dev_20150517_01

筛选出来后，要截取refs/tags/dev_20150516_01 这样的文本，并拼接上“:”


​    
```bash
git show-ref --tag | awk '/2015/ {print ":"$2}'
```

$2是 awk的内置变量 awk 会默认通过 空格将每行文本作切分 $0是整行文本，$1是切分后的第一块区域，这里用的是第二块区域，所以是$2

显示如下

:refs/tags/dev_20150516_01

:refs/tags/dev_20150517_01

最后一步就要借助xargs命令 将截取出来的结果传给删除远程tag的命令


​    
```bash
git show-ref --tag | awk '/2015/ {print ":"$2}' | xargs git push origin
```

这样就可以将两个tag全部删除了

理解了上面的内容那删除本地的tag就没什么了，用如下命令


​    
```bash
git tag | grep 2015 | xargs git tag -d 
```

这里通过 git tag显示所有tag，通过grep做过滤，如果需要用正则，这里其实也可以用awk命令，根据需要选择

同理删除branch也是一样的

