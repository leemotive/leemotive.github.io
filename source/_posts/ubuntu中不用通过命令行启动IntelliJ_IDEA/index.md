---
title: "ubuntu中不用通过命令行启动IntelliJ IDEA"
author: 柚子816
toc: true
comment: true
date: 2015-12-31 23:28:00
tags: 
  - idea
keywords:
  - ubuntu
  - 启动图标
category: 工具
cover: 
---

在ubuntu中安装了IntelliJ IDEA后发现只能通过命令行启动，通过图标启动一直提示找不到 jdk

只需要修改 /usr/share/applications/jetbrains-idea.desktop

把其中的

Exec="/opt/idea-IU-143.1184.17/bin/idea.sh" %f

改为

Exec=env JAVA_HOME=/opt/jdk1.8.0_65 "/opt/idea-IU-143.1184.17/bin/idea.sh" %f

其实是添加了java_home配置，这样启动时就不会报找不到jdk了

