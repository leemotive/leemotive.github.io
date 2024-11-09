---
title: CSS原生高亮API
author: 柚子816
toc: true
comment: true
date: 2024-11-09 20:28:06
tags:
  - CSS
  - highlights
category: 前端
cover: ./cover.jpg
---

在搜索结果中高亮搜索的关键字是一个非常常见的需求，以往都是在搜索结果中把关键字找出来，然后拼成一个独立的标签，并添加一个特定的高亮class，有了这个标签，就可以针对这个class 实现自定义样式，达到高亮的目的。不过今天讲的不是这种实现，而是一种原生api



## CSS Custom Highlight API

CSS 自定义高亮 API 使用 JavaScript 创建范围并使用 CSS 定义样式来设置文档中任意文本范围的样式，不过这种情况下能够设置的样式有限，允许属性包括

> - color
> - background-color
> - text-decoration
> - text-shadow
> - -webkit-text-stroke-color、 -webkit-text-fill-color、 -webkit-text-stroke-width

而使用这套API完成高亮，需要以下步骤

```javascript
const parentNode = document.getElementById('p')
// 创建Range对象
const range = new Range();
range.setStart(parentNode, 10);
range.setEnd(parentNode, 20);

// 创建高亮对象, 当然构造函数参数可以传递多个range对象
const highlight = new Highlight(range);

// 注册对象, 第一个参数自定义名字，在css中将要用到
CSS.highlights.set('high1', highlight);
```

js部分就已经完成了，下面就是css部分了

```css
/* 名字要和js中注册的名字保持一致 */
::highlight(high1) {
	color: red;
}  
```

上面就完成了一个简单的高亮展示 



## 补充说明

一个**Highlight**对象可以添加多个range对象

```javascript
const highlight = new Highlight(range1, range2, range3);
```

可以注册不同的高亮对象，展示不同的高亮样式

```javascript
CSS.highlights.set('high1', highlight1);
CSS.highlights.set('high2', highlight2);
```



----

range对象的 setStart 和 setEnd 参数的第一个参数dom对象可以是不同的dom对象，但是结束位置一定是在开始位置之后。如果dom对象是文本节点，那第二个参数表示是文本内容的位置。如果dom对象是普通元素，那第二个参数表示是元素的第n个子元素

可以使用下面这个链接查看效果[CSS高亮demo](/2024/11/09/CSS高亮demo/index.html)
