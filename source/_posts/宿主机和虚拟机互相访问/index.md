---
title: "宿主机和虚拟机互相访问"
author: 柚子816
toc: true
comment: true
date: 2016-01-10 17:41:00
tags: 
  - virtualbox
keywords:
  - 虚拟机
  - 访问
category: 工具
cover: 
---

环境

宿主机： win7

虚拟机：VirtualBox Centos7

有时为了做测试，要在虚拟机上布署一个web服务，然后在本地宿主访问，这就要宿主机和虚拟机之间能够互相访问，为此要做如下设置

在虚拟机的设置中启用两块网卡如下图

![](./aa04bd1f-6e00-3a14-8215-58e71b180bdf.png)



![](./ac447164-25cf-36ad-a598-412ee5488665.png)


第一个块网卡设置为Host-Only Adapter第二块网卡设置为NAT。此时查看宿主机的IP。命令ipconfig


![](./62f1fc6f-262b-3cf7-8520-4b5c2ceb7d65.png)

Wireless LAN是我宿主机的无线网，而 VirtualBox Host-Only Network则是由虚拟机生成的

启动虚拟机。确保两个网卡都连接上

![](./b0503431-6f18-3617-8dcd-05553ce6e391.png)

查看Centos的ip。命令 ifconfig。注意这里是ifconfig不是ipconfig

![](./8d91737e-82dc-32c4-b4d5-09cce20e22e0.png)

注意红框中的ip，一定要和在宿主机中看到virtualbox生成的那块网卡在一个网段下

现在在宿主机中 ping 192.168.56.103试试，是否能ping通

返过来，ping宿主机也是可以ping通的

如果都能ping通，但是却不能访问网页，要检查虚拟机中的防火墙设置，centos7默认用的是firewall

查看状态 systemctl status firewalld

如果是启动状态，可以停掉试试。sudo systemctl stop firewalld

或者用其自带的配置工具配置。命令： firewall-config，调用图形配置工具

===================================这是分割线======================================

突然发现上面的方法好复杂，其实只要将虚拟机设置为bridge模式即可


![](./43ca761f-421e-3497-9c67-9b2c69259ab1.png)

此时虚拟机网址应该和宿主机是一个网段下的

![](./e166a9ca-235d-3c02-92a3-98493a4ea276.png)



![](./096c4a3b-3115-3268-82dc-fd3d8f9ef4b7.png)

此时就可以互相访问对方起的服务了

虚拟机访问宿主机  

![](./aa420bee-104e-3350-aed6-a8f3627c2212.png)

宿主机访问虚拟机  

![](./6ebcb25b-bbe6-367d-a824-43c97ded2f45.png)  

