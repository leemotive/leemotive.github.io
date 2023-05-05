---
title: 如何给某一类项目统一设置用户名和邮箱
author: 柚子816
toc: true
comment: true
date: 2022-08-24 16:51
tags:
  - git
keywords:
  - config
  - includeif
category: 工具
cover: ./includeif.jpeg
---


在浏览公司项目的时候，发现总有提交记录使用的是用户名和邮箱根本看不出来是哪路神仙提交了代码，这种情况最好的方案当然是在服务器上设置 git hook 检查，统一使用真实用户名及公司邮箱，对于不满足条件的一律拒绝 push 代码。

然而这个时候如果用户一个不上心在本地使用了不符合规范的用户名邮箱 commit 代码，则需要用户修改历史提交信息，变更用户名邮箱重新 push，说实在的一般 git 用户还真不一定会这骚操作。

![](./rebase.png)

今天学习了一种一劳永逸的方法，入职新公司配置一次，一直用到你离职的那种。在 git 的官方文档里都有介绍的，只是平时不太关注

## 如何配置项目用户名邮箱

先回顾一下 git 如何设置用户名邮箱，不考虑系统级配置和工作树配置。日常主要使用全局设置和项目设置

```bash
$ git config --global user.name yourname
$ git config --global user.email mailaddress
```
这是全局设置，在没有单独配置项目的情况下，所有项目都会使用这个配置。在项目内去除 `--global` 选项执行这两个命令就是单独为项目设置用户名邮箱，覆盖全局的配置

**对我而言**

- 全局配置的用户和邮箱是我自己的，主要是为了自己的项目，一般使用个人邮箱
- 公司项目每个项目都单独配置一次用户名邮箱, 使用公司邮箱

**问题**

公司不只一个项目，每克隆一个新项目，或者新建一个项目的时候，都需要重新配置，然而人有失足马有失蹄，项目包多了总有忘记的时候。

![](./forget.jpeg)

**今天要介绍的 includeIf 就是为了解决这个问题的，可以按照一定规则为满足条件的项目统一配置**

### gitdir
修改 git 的全局配置文件，一般是用户主目录下的 `.gitconfig` 文件

打开文件添加如下配置
```ini
[includeIf "gitdir:/Users/lee/ent/code/"]
  path = .entconfig
```
这段配置表示的是所有存放在 `/Users/lee/ent/code/` 的仓库将会使用 `.entconfig` 这个文件里的配置

那么就新建 `.entconfig` 文件来配置用户名邮箱，甚至其它的一些 git 配置都是可以的，示例如下
```ini
[user]
  name = entname
  email = name@ent.cn
```
这样就完成了相应的配置，只需要将代码仓库放在指定目录下就可以了

### hasconfig
通过 gitdir 可以完成相同目录下的仓库配置，而 hasconfig 则是检测 git 仓库有没有相应的配置，来决定要不要应用相就的配置文件

比如同一家公司的代码仓库地址是有相同的域名的，我们可以据此判断是否使用特殊配置

代码仓库地址格式有两种
```
https://git.ent.cn/group/project.git

git@git.ent.cn:group/project.git
```
完全相同部分为中间域名部分，在全局配置文件中添加如下配置

```ini
[includeIf "hasconfig:remote.*.url:**/*git.ent.cn*/**"]
  path = .entconfig
```
这段配置指明了，如果仓库的地址中包含 `git.ent.cn` 这个域名，就启用相应的配置文件

***问题***
- 在本地通过 `git init` 一个新仓库，但还没有添加 url 的时候，无法匹配到这个规则 
- hasconfig 需要 git 版本 `2.36.0` 及以上。而 gitdir 对 git 版本要求要宽松许多，很早就支持了，具体是哪个版本开始支持的，没有查到


---

上面只是以用户名邮箱来举例，事实上你可以在 `.entconfig` 中配置任何你想的配置。虽然每天都在使用 git，但也就是 `checkout, pull, commit, push` 等常用命令而已，像这种好玩实用的知识知道的太少了，今天又涨知识了。各位看官有没有其它好玩的知识呢？

