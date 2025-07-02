---
title: 告别Flip动画：View Transition API带来的革命性变革
author: 柚子816
toc: true
comment: true
date: 2025-07-02 16:58:51
tags:
  - JavaScript
  - Flip
  - View Transition API
category: 前端
cover: ./cover.jpg
---

前端动画发展这么多年了，transition、animation等，但他们都有一个问题，就是页面元素结构发生变化时，无法应用动画。所以就有了FLIP动画，它可以在页面元素结构发生变化时，应用动画。

## FLIP动画: 曾经的王者
FLIP是First, Last, Invert, Play的缩写，它是一种动画效果，它的核心思想是：在元素结构发生变化时，先记录元素的初始状态，然后记录元素的最终状态，然后计算出元素的变化量，最后应用这些变化量，就可以实现动画效果。

1. **First**: 记录元素的当前状态（位置、大小）
2. **Last**: 修改元素，记录元素的最终状态（位置、大小）
3. **Invert**: 计算元素的变化量, 并通过transform将元素恢复到初始状态
4. **Play**: 对transform应用动画，将元素移动到最终状态

这种方式被广泛应用于拖拽, 列表重排等场景中。但是它太麻烦了。需要手动计算元素初始及结束状态，及变化量，然后应用到元素上。

## View Transition API: 革命性的变革
View Transition API是一种新的API，它可以在页面元素结构发生变化时，通过动画的方式完成变化

```javascript
document.startViewTransition(() => {
  // 这里是修改页面元素的代码
  // 比如更新DOM，调整元素位置等
});
```
只需要将DOM变更的代码放在startViewTransition的回调函数中，就可以实现动画效果了。浏览器会自动：
- 捕获前后状态
- 自动为旧视图和新视图创建snapshot
- 管理动画过程

使用这个新的api你只需要专注于**我想改什么**， 不再关注怎么应用动画

## CSS
View Transition API 还有配套的CSS属性，用于控制动画效果,主要有以下几个属性：

`::view-transition`, `::view-transition-old`, `::view-transition-new`, `::view-transition-group`, `::view-transition-image-pair`

----
曾经我们用FLIP实现流畅的动画效果，是因为浏览器不给力。今天，浏览器已经足够给力，是时候说一句

> 再见，FLIP。你好，View Transition API。