---
title: npm 奇奇怪怪的知识又增加了
author: 柚子816
toc: true
comment: true
date: 2023-04-07 11:08
tags:
  - npm
  - install
  - alias
category: Node
cover: ./install.png
---

你可曾想过在一个项目里, 同一个库，需要同时安装两个不同的版本。我想大部分人应该是没这种神经需求的。可是我偏偏遇到了，想要这么干

## 问题

原本打算写一个 vue 指令并发布，方便其它项目使用的。项目使用 typescript 编写。既然是 typescript 项目，那肯定要用好它的类型系统。可是 Vue2 和 Vue3 在指令这块支持的钩子函数不一样。在写 vue2 的指令时需要使用 vue2 中类型定义，在写 vue3 指令时需要使用 vue3 中的类型定义。可使用 `npm install vue` 这条命令是无法同时安装 vue 的不同的版本的。后安装的一定会覆盖先安装的。这时我的疑问就来了，**能不能同时安装 vue 的 2.x 和 3.x 版本**。

- 第一个想法是先安装 vue 2.x 版本，先写 vue2 下的指令，再安装 3.x 版本，写 vue3 下的指令，想修改哪个版本的指令就安装哪个版本的 vue, 反正 vue 在我的项目中只能是开发依赖，发布时并不包含，如果不是为了使用类型，不安装都可以。**太费事**
- 不使用 npm install 安装，把 vue 2.x 和 3.x 都下载到本地，分别置于 vue2 和 vue3 目录。这样就可以同时使用了，一劳永逸。但我的项目却也多了这些外来代码。**不干净**

## 方案

踏破铁鞋无觅处，得来全不费功夫。原来 npm 早就为你考虑好了，哪需要自己那么费事去想方案。

```bash
npm install <alias>@npm:<name>
```

在使用时 **alias** 就是安装后 node_modules 下的目录名称，**name** 就是平时要安装的包名。对于我这里可以这么做

```bash
pnpm add vue3@npm:vue@3 -D
pnpm add vue2@npm:vue@2 -D
```
执行这两条命令之后，在 package.json devDependencies 下将会添加如下两条
```json
{
  "vue2": "npm:vue@2",
  "vue3": "npm:vue@3"
}
```
而在 node_modules 目录下也会增加 vue2 和 vue3 两个目录

```js
import {ObjectDirective} from 'vue2'; // 引用 vue2 中的指定类型。 vue3 同理
```

----

奇怪的知识又增加了，你还有其他什么奇怪的知识么，欢迎评论区分享
