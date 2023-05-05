---
title: "jquery width"
author: 柚子816
toc: true
comment: true
date: 2014-10-18 20:40:00
tags: 
  - jquery
keywords:
  - width
  - height
category: 前端
cover: 
---

脑子不好使了，看过一段时间就又忘了

jquery 提供了width innerWidth outerWidth方法来取元素的宽度

width: 仅仅取content的宽度，没有padding, border, margin部分

innerWidth: 取content + padding 宽度

outerWidth (不提供参数或false) : 取content+padding+border宽度

outerWidth(true): 取content+padding+border+margin宽度

取height和width是类似的，四种情况

