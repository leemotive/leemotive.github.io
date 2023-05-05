---
title: "js中new Date"
author: 柚子816
toc: true
comment: true
date: 2014-12-08 09:43:00
tags: 
  - JavaScript
keywords:
  - Date
category: 前端
cover: 
---

前两天在项目中遇到，以前一直没注意到这个问题

在js中如果采用new Date新建一个时间对象，返回的是当前时间

但是如果给了‘2012-10-01’这样的参数，那无疑返回的肯定是2012年10月1日，那时分秒呢，这时候时分秒是多少？如果认为像java那样，是00:00:00那就错了。

new Date('2012-10-01')

这样写，js会自动作时区处理，比如我电脑设为东8区，那返回的时间是2012-10-01 08:00:00


​    
```js
new Date('2012-10-01')
Mon Oct 01 2012 08:00:00 GMT+0800 (China Standard Time)
```

如果是西2区，返回的时间会是 2012-09-30 22:00:00


​    
```js
new Date('2012-10-01')
Sun Sep 30 2012 22:00:00 GMT-0200 (Local Standard Time)
```

如果是 new Date('2016-01-01') 和 new Date('2016-1-1') 结果又不一样，真是坑啊

如果想得到00:00:00的话，那还是时间字符串写全了，你这样


​    
```js
new Date('2012-10-01 00:00:00')
Mon Oct 01 2012 00:00:00 GMT+0800 (China Standard Time)
```

我擦被坑了，不是所有浏览器都支持 new Date('2012-10-01 00:00:00')这样的写法的。firefox不支持，ie11不支持，但是ie8支持，擦，要不要这么不统一。有没有都能解析的格式。

到目前为止 new Date('2012/10/01 00:00:00') 这种格式支持的比较好。不过最王道的方法还是


​    
```js
new Date(year, month, day, hours, minutes, seconds, ms)
```

将年月日时分秒全部解析出来作为 new Date()的参数，这个可以确保万无一失

