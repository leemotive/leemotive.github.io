---
title: "解决sudo: npm: command not found"
author: 柚子816
toc: true
comment: true
date: 2016-01-06 22:47:00
tags: 
  - centos
keywords:
  - sudo
  - npm
category: linux
cover: 
---

在centos上遇到的问题

sudo npm install *** 提示 sudo: npm: command not found

但是通过 su 切到 root用户 直接执行 npm install ***却是可以的，搞不懂啊

通过高人指点执行下面两句就可以了


​    
```bash
sudo ln -s /usr/local/bin/npm /usr/bin/npm
sudo ln -s /usr/local/bin/node /usr/bin/node
```

搞定，知道这是建了link但是为什么会这样，还是不明白

