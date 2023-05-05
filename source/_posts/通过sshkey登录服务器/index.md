---
title: "通过sshkey登录服务器"
author: 柚子816
toc: true
comment: true
date: 2016-01-10 15:08:00
tags: 
  - ssh
keywords:
  - sshkey
  - 登录
category: 工具
cover: 
---

在需要通过远程登录服务器的时候，虽然可以通过 ssh user@host然后输入密码的方式登录，但是更为常用的是通过sshkey来登录

我服务器用的是centos7（virtualbox虚拟）

确认安装ssh服务，centos7默认就有的。如果没有请自行安装

修改配置文件 /etc/ssh/sshd_config

找到RSAAuthentication和PubkeyAuthentication两项配置，将值改为yes（注意去掉前面的注释符号#）

将你的公钥的内容写到 ~/.ssh/authorized_keys中

重启ssh服务


​    
```bash
sudo systemctl stop sshd
sudo systemctl start sshd
```

或者直接用 restart

在本地机器上添加配置


​    
```ini
Host  c7
    HostName     192.168.56.102
    Port         22
    User         lee
    IdentityFile ~/.ssh/id_rsa_a
```

这里的Host后面的名字随便取，不必像配置git的时候要和HostName一样了 User是服务器上的用户名

此时再登录的时候不必再用 ssh lee@192.168.56.102的方便来登录了，而是

ssh c7 （c7就是Host后面的名字）

如果要禁止用户以用户名密码的方式登录服务器，可以修改服务器上的ssh配置文件

找到 PasswordAuthentication 将值 改为no，重启sshd，本地就无法通过 ssh lee@192.168.56.102的方式来登录了

用的虚拟机测试的时候，请注意虚拟机和本地机器是否能互通，以及服务器的防火墙设置

