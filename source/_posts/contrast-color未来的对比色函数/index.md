---
title: contrast-color未来的对比色函数
author: 柚子816
toc: true
comment: true
date: 2025-07-01 23:44:05
tags:
  - CSS
  - contrast-color
category: 前端
cover: ./cover.jpg
---

在网页设计中，颜色的搭配是非常重要的。为了保证颜色的可读性，我们通常会使用对比色来突出文本或其他元素。在CSS中，我们可以使用`contrast-color`函数来生成对比色。但是，这个函数目前还处于实验阶段，还没有得到所有主流浏览器的支持。现在只有Safari Tech Preview版本支持这个函数，其他浏览器还没有支持。

## 怎么使用

```css
.btn {
  --background-color: #007bff;
  background-color: var(--background-color);
  color: contrast-color(var(--background-color));
}
```

现在它只能解析出黑色或者白色，不能解析出其他颜色。这个就比较有点局限了

---- 

不知道以后这个函数会怎么发展，期待一下。有Safari Tech Preview版本支持这个函数的浏览器，可以动手试试效果。