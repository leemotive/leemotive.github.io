---
title: v-model 居然没用，你敢想？
author: 柚子816
toc: true
comment: true
date: 2023-03-27 22:41
tags: 
  - javascript
  - vue.js
  - v-model
category: 前端
cover: ./vue.jpeg
---

## 问题

前段时间遇到一个问题，在一个 vue 项目中，一段很简单的代码居然出现一个十分诡异的问题。代码如下

```html
<template>
  <div>
    <input v-model="name" class="com-input">
    <new-com v-model="name" class="new-com"></new-com>
  </div>
</template>
```

其中 new-com 是自定义的一个组件，内容也很简单，

```html
<template>
  <div>
    <div> {{value}} </div>
    <button @click="random">随机</button>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  methods: {
    random() {
      this.$emit('input', Math.random())
    }
  }
}
</script>
```

这个自定义组件，仅仅是通过 **value 和 input** 搭配来让组件支持 `v-model` 而已

看到这段代码也许有人该问了，这么简单的代码能有什么问题。是的我也是这么想的，把它复制到别的项目里，完全没有问题，可是在我的这个项目里，它就是有问题。**new-com 组件内 value 的值无法正常显示**。遇到这样的玄学问题，你会怎么想，要怎么解决？

## 排查

正如上面所说，这段代码过于简单，复制到别的项目里是没有问题的。那肯定是项目本身的问题了。经过一些简单测试之后，输入框输入改变 name 值无法在 new-com 组件内展示, 而 new-com 组件内的按钮点击，可以将一个随机值反馈到输入框内, 也就是说，**new-com 组件内并没有通过 value 属性接收到来自父组件的传值**。这不是很奇怪么，不是说 v-model 是 value 和 @input 的组合的语法糖么，怎么不生效。当然也没有完全不生效，至少 new-com 组件能够通过 input 事件修改了 v-model 绑定的值。只是 value 这个属性好像没有生效。

居然通过 v-model 没有把 value 传给 new-com 组件，那如果手动传递 value 呢

```html
<new-com v-model="name" :value="name" class="new-com"></new-com>
```

这时，惊奇的发现 new-com 组件内能够正常接收到传进来的值了。

那这时我就需要看看，v-model 被转化成什么样子的代码了。

在我的项目内，查看编译的结果文件，引用 new-com 组件时的代码是这样的

![Screenshot 2023-03-27 at 20.21.56.png](./Screenshot%202023-03-27%20at%2020.21.56.png)

在这里 v-model 在 input 输入框和 new-com 组件上转化方式是一样的，但是 new-com 组件无法通过 value 属性接收值

那现在再看一下 添加 `:value="name"` 之后，会被解析成什么样子

![Screenshot 2023-03-27 at 20.38.04.png](./Screenshot%202023-03-27%20at%2020.38.04.png)

可以看到多了一个 **attrs**, 此时已经可以接收到正确的值了。


然而问题是为什么要手动添加 **value** 属性，这不合常理，于是便将代码移到一个正常的项目中，看看在正常的项目里，会转化出什么样的代码。结果又是这样的


![Screenshot 2023-03-27 at 20.21.11.png](./Screenshot%202023-03-27%20at%2020.21.11.png)

此时转化出来的已经没有 domProps 和 attrs 两个属性了。

## 结果
经过几次生成的代码的对比，发现在有问题的项目里和正常项目，转化出来的代码是不一样的。这也说明了就是在转化 vue 文件的时候存在差异。而这件事是由 **vue-template-compiler** 负责的，经过对比发现，在有问题的项目中，使用的 **vue** 版本为 **2.3.3** 而使用 的 **vue-template-compiler** 却是 **2.1.0** 版本。而在正常项目中，使用的都是 **2.3.3** 版本

----

请不要问我为什么项目里 vue 的版本和 vue-template-compiler 的版本会不一样，难道构建代码的时候没有提示么。确实 vue-template-compiler 在运行的时候会判断对比 vue 和 vue-template-compiler 的版本，如果版本不一致会中断构建任务


![Screenshot 2023-03-27 at 22.08.05.png](./Screenshot%202023-03-27%20at%2022.08.05.png)

但是在我的项目里 vue-template-compiler 是通过 npm 安装的，而 vue 却是直接将文件下载到项目本地。vue-template-compiler 在运行的时候根本不知道项目会使用哪个版本的 vue。至于为什么会这样子。暂时先把它归结为历史原因吧。一段我也不清楚的历史。

所以这种问题基本也不用太在意，但凡正常的点项目都不会遇到这种问题。每天踩一坑，坑坑不一样。


