---
title: 如何只打印部分区域，一条 css 帮你搞定
author: 柚子816
toc: true
comment: true
date: 2023-04-11 00:10
tags:
  - JavaScript
keywords: 
  - print
  - has
category: 前端
cover: ./print-element.jpeg
---


网页开发过程中，尤其是一些 OA (Office Automation) 类的系统，有时难免要打印一些内容，比如单据、凭证啊什么的，当在网页上将这些内容渲染出来后，在打印的时候，只想打印我们关心的那一部分，其它无关内容（菜单导航之类）均不想被打印出来，该如何操作

## 需求

想要实现一个好的打印功能，我以为需要满足以下5个条件

- 打印页面上一个或者多个指定的元素及子元素
- 多个元素的相对位置没有任何要求
- 保留被打印元素的样式
- 无论是展示元素还是表单输入元素均可被完整打印
- 打印预览时不能影响网页的正常展示


网络上一些较常见的方法基本是获取指定元素的 `innerHTML` 并放入一个 iframe 之中，为保留样式需要将原网页的所有样式表同步带入 iframe 中，然后调用 iframe 的 `print` 方法，工作量大不说，并且如果需要的打印的元素的样式有父级元素有依赖，这个操作会丢失父级元素的信息，部分样式可能无法生效，且表单元素的输入也会丢失。还有些实现是修改当前页面的 dom 结构，获取被打印元素，直接挂在 body 下，且 body 下只保留被打印元素，如此一来，当前页面已经发生变化，在打印完成后，还需要进行页面恢复，也是比较复杂的。

## 实现

```css
@media print {
  :has(.print-element) > :not(.print-element):not(:has(.print-element)) {
    display: none;
  }
}
```

如此只要在需要被打印的元素上添加 **print-element** 这个类名，当调用 `window.print()` 的时候，只有那些有这个类的元素及其父元素和子元素可以正常被预览，并打印出来

---

也可以使用[elements-printer](https://www.npmjs.com/package/elements-printer) 支持自定义类名，多个不同打印区域。vue 项目通过指令的方式简化调用等
