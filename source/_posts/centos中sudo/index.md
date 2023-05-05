---
title: "centos中sudo"
author: 柚子816
toc: true
comment: true
date: 2016-01-04 22:46:00
tags: 
  - centos
category: linux
cover: 
---

装好的VirtualBox后挂载共享目录


​    
```bash
sudo mount -t vboxsf vmshare ~/vmshare
```

岂料以提示 xxx is not in the sudoers file

该死的centos，用ubuntu是没有这种问题的

这时要通过 su 切换到root用户

然后执行


​    
```bash
visudo
```

添加红框中的文本


![](./c77d88ef-0bb1-3b5b-849f-19af86ed3b37.png)  

请用自己的用户名替换。

