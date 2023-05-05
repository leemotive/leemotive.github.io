---
title: "velocity模板文件的变量未使用!检查提示"
author: 柚子816
toc: true
comment: true
date: 2016-09-27 21:28:00
tags: 
  - velocity
keywords:
  - 模板
  - "!"
  - 感叹号
  - 检查
category: 工具
cover: ./fefd64ec-a6cc-4e0d-a211-1b77c7a545b4.png
---

如果你的项目中还在使用velocity，那你一定知道velocity的模板文件中对变量的使用可以有如下几种写法

1\. $name

2\. ${name}

3\. $!name

4\. $!{name}

用过velocity肯定知晓，{}可以明确变量名的边界，而！则是为了不让在变量未定义的时候，直接将变量表达式显示在页面上

为此需要统一风格，在模板文件中使用“!”,
我的项目中也因此出产问题，所以需要在项目构建中进行检查，然而在网上并没有找到合适的工具（也许真的只是我没有找到而已）。没办法，自己动手，丰衣足食吧。写了个gulp插件

些插件只检查将要用于显示的变量使用。对于#set,#if,#elseif,#foreach,#macro后面的括号，以及宏调用，函数调用时的参数都不作检查，同时提供参数配置需要忽略不作检查的变量名

详情请稳步 [velocity-lint](https://www.npmjs.com/package/velocity-lint) 查看用法

