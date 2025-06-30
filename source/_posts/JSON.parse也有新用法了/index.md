---
title: JSON.parse也有新用法了
author: 柚子816
toc: true
comment: true
date: 2025-06-30 22:27:24
tags:
  - JSON
category: 前端
cover: ./cover.jpg
---

这个还处于stage3的提案，但目前已经得到所有主流浏览器的支持

JSON.parse用于将JSON格式的字符串解析为JavaScript对象。这个方法在JavaScript中非常常用，特别是在处理API响应、从文件读取数据等场景中。

```javascript
JSON.parse(text, reviver);
```
其中text是要解析的JSON字符串，reviver是一个可选的函数，用于在解析过程中对每个键值对进行转换。在以前reviver函数只能接收两个参数，现在已经可以接收第三个参数，用于获取当前解析的原始字符串

```javascript
var jsonString = '{"name": "zhangsan", "id": 10007199254740991008, "city": "Hangzhou"}';
JSON.parse(jsonString, function(key, value) {
  // 这里的value是默认解析出来的值，我们可以对它进行修改并返回新值
  return value;
});
```

这里的问题就是数字太大了，超出了JavaScript的Number类型安全范围，会出现精度丢失的问题。所以reviver函数的第三个参数可以用来解决这个问题

```javascript
var jsonString = '{"name": "zhangsan", "id": 10007199254740991008, "city": "Hangzhou"}';
JSON.parse(jsonString, function(key, value, {source}) {
  if (typeof value === 'number') {
    return source;
  }
  return value;
});
```

这样就可以解决数字太大的问题了，source参数就是原始的字符串，我们可以直接返回它，这样就不会出现精度丢失的问题了。