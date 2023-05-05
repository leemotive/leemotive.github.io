---
title: "获取每个月有多少天"
author: 柚子816
toc: true
comment: true
date: 2016-02-01 22:33:00
tags: 
  - JavaScript
keywords:
  - 每月的天数
category: 前端
cover: 
---

最近在项目中偶然发现一段别人写的代码，获取一个中有多少天，以前写这个的时候，基本是定义一个数组

[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

然后用月份做下标去取得到 days， 然后再执行 days += days < 30 && isLeapYear(year) ? 1 : 0;
以此来修正闰年2月份的天数。其中isLeapYear是用判断是否是闰年的，可用下面的方法判断

year % 4 === 0 && year % 100 !== 0 || year % 400 === 0

但是在项目中看到的是，如果月份是8月或以上，给月份自加1，这样就可以用
月份%2，根据余数来判定是30天还是31天。省去定义数组的过程。想法不错，但是还是要判断月份是否大于等于8月份。不太好。

于是乎有了下面的方法


​    
```js
function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

function daysInMonth(month, year) {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    return Math.ceil(Math.abs(month - 7.5)) % 2 + 30;
}
```

这里的月份是从1-12,如果月份是从0开始到11。可在方法里面做对应的修正。这样是不是更简单点，只是看着没有上面的直观，更没有第一个方法直观

