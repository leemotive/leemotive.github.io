---
title: 用transformer给vue加点功能
author: 柚子816
toc: true
comment: true
date: 2025-04-17 21:33:16
tags:
  - vue3
  - transformer
category: 前端
cover: ./cover.jpg
---

用vue这么长时间，最近突然有一个想法。就是简化属性传false值的写法



## 属性值为true

给组件传true的时候，可以只写属性不写值，比如下面这样

```vue
<template>
	<el-link type="primary">primary</el-link>
</template>
```

这个el-link有个属性名为 `underline` 默认为true，如果想要设置为false, 需要显示传递 `:underline="false"` 

但是如果一个属性需要传值true,却可以如下简写

```vue
<template>
	<el-link type="primary" disabled>primary</el-link>
</template>
```

但是传false时却无法简写，必须显示设置



## 简化false传值

```vue
<template>
	<el-link type="primary" !underline>primary</el-link>
</template>
```

目标是在属性前面添加一个感叹号表示给这个属性传false。这样对于常量true/false只需要添加或者移除属性前面的感叹号。但是vue本身貌似没有这个功能，又应该如何实现呢



## nodeTransforms

这里以vite项目为例，在vite项目中使用`@vitejs/plugin-vue` 支持vue文件的构建。而这里就可以添加自定义的节点转换器把`!underline` 转换成 `:underline="false"`

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import falseTransform from "false-transform"

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [falseTransform],
        },
      },
    }),
  ],
});
```

在这个transform当中，会找到所有感叹号开头的属性，并改成v-bind指令属性



----

真是第一次使用自定义transform，感觉打开一扇新大门
