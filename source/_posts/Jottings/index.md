---
title: "Jottings "
author: 柚子816
toc: true
comment: true
date: 2014-10-22 22:52:00
tags: 
  - JavaScript
keywords: 
  - 事件绑定
category: 前端
cover: 
---

1. 采用addEventListener将同一个函数多次绑定在同一个元素上（相同阶段）, 执行一次

     i.addEventListener('click', fun, false);

     i.addEventListener('click', fun, false);  

     fun只被调用1次

     解绑只需一次

     i.removeEventListener('click', fun, false);

     i.addEventListener('click', fun, false);

     i.addEventListener('click', fun, false);

     i.addEventListener('click', fun, true);

     i.addEventListener('click', fun, true);

     fun被调用2次, 捕获阶段一次，冒泡阶段一次

     解绑需2次，捕获阶段1次，冒泡阶段1次 

     i.removeEventListener('click', fun, false);

     i.removeEventListener('click', fun, true);  

2. 采用attachEvent将同一个函数多次绑定在同一个元素上 , 执行多次

     i.attachEvent('onclick', fun);

     i.attachEvent('onclick', fun);

     i.attachEvent('onclick', fun);

     fun被执行3次  

     要采用多次detachEvent解绑

3. 采用onclick将同一个函数多次绑定在同一个元素上 , 执行一次(不论ie还是chrome)
     i.onclick = fun; 
     i.onclick = fun;
     i.onclick = fun;
     fun被执行1次,

     解绑只要1次，i.onclick = null

4. onclick 和addEventListener绑定事件时，函数内部this指向dom元素，
     attachEvent绑定事件时，函数内部this指的是window

