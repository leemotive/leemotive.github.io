---
title: "Mac安装python3权限问题"
author: 柚子816
toc: true
comment: true
date: 2018-03-04 23:43:00
tags: 
  - brew
  - python3
category: mac
cover: ./9d749744-b063-4b06-8f81-ca9230ff8390.jpg
---

今天在电脑上安装python3，一切都很正常，到最后出现


​    
```bash
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

上网搜索了一翻，基本都是说

sudo chown-R$(whoami):admin/usr/local

这就是把/usr/local目录下全部改了owner及group了。也有建议使用

sudo chown -R (whoami)(brew –prefix)/*

但是我最终使用的方法是手动在/usr目录下建一个Frameworks目录，然后更改owner及group及当前用户及用组，最后执行

brew link python3

安装完成

----

但是如此安装完成之后pip3会没有安装成功，大概是因为最后只link了python3

所以最后一步还是采用brew install python3来重新安装python3,如此安装成功之后就会自带pip3了

