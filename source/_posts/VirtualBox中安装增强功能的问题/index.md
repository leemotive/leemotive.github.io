---
title: "VirtualBox中安装增强功能的问题"
author: 柚子816
toc: true
comment: true
date: 2016-01-04 22:37:00
tags: 
  - virtualbox
keywords:
  - 增强功能
category: 工具
cover: 
---

今天要把文件从windows中传到VirtualBox中的centos中，于是使用共享目录

先安装增强功能

在VirtualBox菜单中选择 Device -> Insert Guest Additions CD images

自动运行或者手动运行 autorun.sh

安装过程中发生错误，在错误日志 /var/log/vboxadd-install.log中看到

/tmp/vbox.0/Makefile.include.header:97: *** Error: unable to find the sources
of

your current Linux kernel. Specify KERN_DIR=<directory> and run Make again. St

op.

Creating user for the Guest Additions.

Creating udev rule for the Guest Additions kernel module.

提示 unable to find the sources of your current Linux kernel

此时需要执行

yum install -y gcc kernel kernel-devel kernel-headers

重启再安装就可以了

虽然安装的时候还有问题，但是我需要的功能已经都可以了（分辨率，鼠标随意切换，共享目录），所以也就没管了

之前用ubuntu的时候还从未遇到这样的问题

