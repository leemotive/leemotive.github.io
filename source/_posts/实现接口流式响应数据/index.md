---
title: 实现接口流式响应数据
author: 柚子816
toc: true
comment: true
date: 2024-01-24 10:41:18
tags:
  - midway.js
  - node
  - 流式响应
category: 前端
cover: ./cover.jpeg
---



在过去的2023年，人工智能，chatgpt 着实火遍全网，大公司都在纷纷发布自己的大语言模型，小点的公司都在基于这些模型来开发上层应用，各类应用层出不穷。而在实现这些应用的过程中，其中有一个小功能就是如何在回答问题时，将结果逐词逐字的显示出来，有种真实在对话的感觉。这种方式可以快速给予用户响应，避免用户在经过漫长的等待之后，一次性给用户展示整段文本。



## 流式响应

要实现这种响应结果逐词逐句显示，则需要服务端每生成一点内容就往客户端推送一点内容，客户端接收一点内容就展示一点内容。而相关的技术也不是在2023年才有的，像轮询，websocket 等都可以实现这种效果。只是以往的web应用基本用不到这样的功能，所以接口请求都是在完整接收数据之后现处理数据，展示数据。即使是社交通信工具的对话文本也是整段发送显示的。导致有不少开发同学只是听说过流式响应，而并没有实际应用过。前段时间看到有不少人在问如何实现类似 chatgpt 那种对话效果。正好2023我们也做过这样的应用，也需要做这样的效果，就把我们公司的实现方法拿来讲一下



我们的项目后端选用的midway.js 前端则是 vue3



## 代码

在服务端将Readable的一个实例对象作为响应返回

```typescript
import { Controller, Get } from '@midwayjs/core';
import { Readable } from 'stream';

@Controller('/api')
export class APIController {
  @Get('/ask')
  async ask() {
    const result = [...'人间四月芳菲尽，山寺桃花始盛开，长恨春归无觅处，不知转入此中来。'];

    const readable = new Readable({ read: () => {} });
    function push(i: number) {
      if (result[i]) {
        // 还有字符则继续 push
        readable.push(result[i]);
        // 100ms 之后读下一个字符
        setTimeout(push.bind(null, i + 1), 100);
      } else {
        // 没有字符之后 push 参数设为 null 标记服务端内容响应结束
        readable.push(null);
      }
    }
    setTimeout(push.bind(null, 0), 100);
    return readable;
  }
}
```

在前端，使用 fetch 发送请求，从响应获取reader对象，并从中读取数据

```js
let content = '';
const btn = document.querySelector('.btn');
const resultContainer = document.querySelector('.res');

btn.addEventListener('click', async () => {
  const response = await fetch('/api/ask');
  const reader = response.body.getReader();
  // 不停的调用 reader.read 方法，写法有很多，能实现就行
  async function read() {
    const {done, value} = await reader.read();
    if (done) {
      // 服务端的响应结束，不会再有后续的响应了
      return;
    }
    // 进行解码获取文本
    content += new TextDecoder().decode(value);
    resultContainer.innerText = content;
    // 不停的调用 read, 读取后续内容,
    setTimeout(read);
  }
  read();
})
```



如果想要使用 XMLHttpRequest 也是可以的，代码如下

```js
const btn = document.querySelector('.btn');
const resultContainer = document.querySelector('.res');

btn.addEventListener('click', async () => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/api/ask');

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      // 响应已经全部拿到了
    }
  })

  xhr.addEventListener('progress', (e) => {
    resultContainer.innerText = e.target.responseText;
  })

  xhr.send();
})
```



## 坑

如果你在开发的时候是正常的，响应数据分次返回，逐词显示，但是部分到线上之后就又变成了长时间等待之后一次性展示的话，不要怀疑你的代码，毕竟在本机是正常的。这时候很有可以是你的生产环境造成，比如 nginx 配置其它的什么把服务端分次返回的数据进行缓存合并，然后才发送给前端页面

```nginx
location / {
  proxy_buffering off;
  proxy_pass http://127.0.0.1:7001/;
}
```

我这里演示所有，所有路径的代理都关闭代理缓冲功能



---

原本这是半年前的做的功能了，最近又有人来问这个问题，所以在这里重写一下
