---
title: "js中类型判断"
author: 柚子816
toc: true
comment: true
date: 2016-02-15 23:03:00
tags: 
  - JavaScript
keywords:
  - 类型判断
category: 前端
cover: 
---

刚接触js的时候，用typeof 来判断, 可是发现用来判断一些简单类型还可以，但是对象就无法判断的，都是返回object

后来发现可以用Object.prototype.toString.call(o) 来判断o的类型，返回 [object Array] [object Date] [object Undefined] 等格式的字符串

本以为可以包打天下，可是又发现，在IE8中

Object.prototype.toString.call(undefined) 返回 [object Object] 而不是返回 [object Undefined]

Object.prototype.toString.call(null) 返回 [object Object] 而不是返回 [object Null]

万恶的ie啊

