---
title: RegExp.escape也进入标准了
author: 柚子816
toc: true
comment: true
date: 2025-06-17 19:38:55
tags:
  - RegExp
  - tc39
category: 前端
cover: ./cover.jpg
---

RegExp.escape() 是 ECMAScript 最新标准中新增的一个静态方法，用于对字符串中的正则表达式特殊字符进行转义处理。这个功能已经正式成为 JavaScript 语言的一部分。

## 功能定义
RegExp.escape() 是一个静态方法，调用方式为：

```javascript
RegExp.escape(string)
```
它会返回一个新字符串，其中所有在正则表达式中有特殊含义的字符都被转义（前面加上反斜杠 \）。

## 转义规则
该方法会对以下正则表达式特殊字符进行转义：
```text
^ $ \ . * + ? ( ) [ ] { } | 
```

## 示例

```javascript
const str = 'file.txt';
const reg1 = new RegExp(str); // 字符串的.会匹配任意字符
const escaped = RegExp.escape(str);
const reg2 = new RegExp(escaped); // 转义后的字符串.不会匹配任意字符,特指.自身
```

## 兼容性
目前，现代浏览器都已经支持 RegExp.escape() 方法。但需要注意的是，也基本是今年的新版本才支持。所以需要谨慎使用。