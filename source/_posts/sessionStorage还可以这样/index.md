---
title: sessionStorage还可以这样
author: 柚子816
toc: true
comment: true
date: 2023-12-06 10:50:38
tags: 
  - sessionStorage
category: 前端
cover: ./cover.png
---



sessionStorage是浏览器提供给开发者存取数据的一个API，它所存储的数据仅在当前会话窗口有效，一旦关闭了 tab 页面，所存储的数据也将随之删除。不同的 tab 之间也无法共享 sessionStorage 中的数据。



然而今天发现sessionStorage 的另一个特点，就是在通过 `window.open` 打开新窗口的时候，会将之前的数据全部复制过来。当然前提条件是新窗口和当前窗口必须是同源的，不能产生跨域。在新窗口打开之后，两个页面之间再进行 sessionStorage 的存取也不会相互产生影响
