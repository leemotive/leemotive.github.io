---
title: "JS中Date对象中几个用法"
author: 柚子816
toc: true
comment: true
date: 2015-07-18 17:48:00
tags: 
  - javascript
keywords:
  - date
  - 最后一天
category: 前端
cover: 
---

近来工作中遇到这样的两个需求

1\. 给个Date对象，找出该时间所在月的第一天和最后一天

2\. 给个Date对象，找出该时间所在周的第一天和最后一天

需求1中的找月第一天很简单，我记得api中有setDate方法可以使用

使用setDate方法前，先看看getDate


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 16:55:23 GMT+0800 (China Standard Time)

date.getDate();
// 18
```

可见getDate返回的是一个月中的第几天（从1开始）

这就好办了。通过setDate(1) 天设为第一天就好了（返回的是毫秒数）


​    
```js
new Date(date.setDate(1));
// Wed Jul 01 2015 16:55:55 GMT+0800 (China Standard Time)
```

返回的当月第一天  

那么最后一天怎么办，哈哈，取月，看本月多少天，如果是2月还要判断是否是闰年。麻烦。其实在使用setDate的时候，本以为参数是从0开始的，结果出现的这个情况


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 17:07:48 GMT+0800 (China Standard Time)
console.log(new Date(date.setDate(0)));
// Tue Jun 30 2015 17:07:48 GMT+0800 (China Standard Time)
```

设置setDate(0)之后不是刚开始想的本月第一天，而是上个月最后一天（以前不知道啊）  
然后就想到了这个办法


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 17:11:31 GMT+0800 (China Standard Time)
console.log(new Date(date.setMonth(date.getMonth() + 1, 0)));
// Fri Jul 31 2015 17:11:31 GMT+0800 (China Standard Time)
```

成功得一个月的最后一天，

如果设置setDate(-1)将得到上个月倒数第二天


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 17:18:14 GMT+0800 (China Standard Time)
console.log(new Date(date.setDate(-1)));
// Mon Jun 29 2015 17:18:14 GMT+0800 (China Standard Time)
```

月的第一天最后一天是找着了。那周的第一天和最后一天呢？  
javascript中是提供了getDay方法，没有提供setDay方法啊，没关系，一周总共7天不会变，不像一个月，有时30天，有时31天，还有28,29天

getDay返回值是0（周日）—— 6（周六）  
如此可用如下方法


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 17:24:27 GMT+0800 (China Standard Time)

console.log(new Date(date.getTime() - 86400000 * date.getDay()));
// Sun Jul 12 2015 17:24:27 GMT+0800 (China Standard Time)

console.log(new Date(date.getTime() + 86400000 * (6 - date.getDay())));
// Sat Jul 18 2015 17:24:27 GMT+0800 (China Standard Time)
```

如此就解决的上面的问题了

ps: 后来又尝试了setMonth()中参数的设置 0(1月) —— 11（12月）  
如果设置-1，-2 或者13呢？


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 17:31:18 GMT+0800 (China Standard Time)

console.log(new Date(date.setMonth(-1)));
// Thu Dec 18 2014 17:31:18 GMT+0800 (China Standard Time)
```

可见返回了去年的最后一个月（12月）， 如果设置-2则是返回去年倒数第二个月（11月）


​    
```js
var date = new Date();
console.log(date);
// Sat Jul 18 2015 17:34:33 GMT+0800 (China Standard Time)

console.log(new Date(date.setMonth(12)));
// Mon Jan 18 2016 17:34:33 GMT+0800 (China Standard Time)
```

设置12则返回了下一年的第一个月（1月），如果设置13返回下一年的第二个月（2月）

如果当前日期是31号比如2015-10-31，此时如果用setMonth将月份设置为9月，得到的将会是哪天呢？会是2015-09-30么？试一下就知道了


​    
```js
var date = new Date(2015, 09, 31);
// Sat Oct 31 2015 00:00:00 GMT+0800 (CST)

date.setMonth(8);
// Thu Oct 01 2015 00:00:00 GMT+0800 (CST)
```

没有得到 2015-09-30
而是得到了2015-10-01，就是因为10月比9月多一天，如果从某个日期设置到2月，得到的可能就是3月1号，3月2号，3月3号了

吐槽一下：

为什么getMonth， getDay， getHours， getMinutes， getSeconds，getMillseconds返回值都是从0开始，而偏偏getDate返回值是从1开始，这么特殊

