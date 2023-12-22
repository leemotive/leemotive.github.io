---
title: 模板字符串和Promise相结合能擦出什么火花
author: 柚子816
toc: true
comment: true
date: 2023-12-22 23:21:00
tags:
  - 模板字符串
  - Promise
category: 前端
cover: ./cover.jpeg
---



这是一个我没有在任何项目使用过的一个用法，完全是在浏览网站的时候突然冒出来的想法，也没有关注过是否有别的库有这样的用法，纯粹觉得有点意思就记录一下

## 背景

在看到一个讲箭头函数和普通函数区别的文章时，就突然冒出了一个问题，js 里有多少种函数，以及怎么调用，返回什么，最后标签函数就出现了，再然后就是模板字符串是否可以用 Promise



## 模板字符串

模板字符串一般用法就是反引号字符串中再引用一些变量，避免过多的加号，让字符串看起来更像一个整体。比如下面这样

```js
const greeting = `hello ${name}`;
```

这里 name 就是一个变量，这个字符串它等价于 `'hello' + name` 但如果 name 的值是通过一个异步函数拿到的。那代码就要改一下了

```js
async function getName() {
  // await 一些异步操作后返回一个 name
}

const name = await getName();
const greet = `hello ${name}`;
```

一定是要在使用模板字符串之前先拿到具体的 name 值，然后再作为变量在模板字符串中使用。那有没有可能在字符串直接使用 Promise 呢，像下面这样

```js
`hello ${getName()}`
```

直接这样使用那肯定是不行的，这个表达式返回的结果将是`hello [object Promise]`



## 标签函数

要想在模板字符串中使用 Promise 那就要使用到这个标签函数了，先看下面代码

```js
function getGreeting(strs, ...exp) {
  // 一些拼接逻辑后返回一个字符串
}

const greeting = getGreeting`hello ${name}`   // 在函数名后直接跟上一个模板字符串
```

这样将会触发 `getGreeting` 函数执行并返回结果，而函数参数 strs 表示是模板字符串中变量占位符分割开之前的字符数组，所有的变量按顺序作为参数传递给函数，这里使用 ...exp 来接收所有参数。可以自行打印参数查看



那如何使用 promise 呢

```js
async function asyncString(strs, ...exp) {
  const params = await Promise.all(exp);
  const arr = [...str];
  params.forEach((p, i) => arr.splice(i * 2 + 1, 0, p));
  return arr.join('');
}

const greetings = await asyncString`hello ${getName()}`;
```



---

实际项目中是真没用过标签函数，也是突然想到的，记录一下，不知各位项目里有没有使用标签函数

