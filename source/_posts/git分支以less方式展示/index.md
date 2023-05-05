---
title: "git分支以less方式展示"
author: 柚子816
toc: true
comment: true
date: 2018-08-27 11:42:16
tags: 
  - git
keywords:
  - branch
  - pager
  - less
category: 工具
cover: ./8b8f664f-889e-49c4-b924-79926f2bfad2.png
---

最近安装了新的git,一开始也没有什么，直到使用了`git branch`这个命令查看所有分支的时候出现了不同，命令将结果以`less`的方式进行展示如下图

![git branch pager](./3ec4b071-7b71-43f0-9f69-d59aadf51b68.png)

有点不习惯了，还是习惯以前在当前窗口直接显示的方式。

可以在执行`git branch`的时候添加 --no-pager 参数, 如下图
![](./c0442126-f85e-4002-b0a8-73aa3466175f.png)

也可以通过全局配置
`git config --global pager.branch false`
设置完成之后分支列表展示结果如下
![](./b3a1a16f-6bb5-4455-902e-adb5c1bc938f.png)

当然这种不仅针对branch命令的，对于status,log命令也可以设置是否以less的方式展示

比如设置status  

![](./68ea8d19-8551-4aac-8e3d-a97cf0458d9e.png)

如此设置之后`git status`命令也将以less方式展示



  