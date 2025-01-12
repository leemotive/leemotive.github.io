---
title: JSON.stringify的阴谋
author: 柚子816
toc: true
comment: true
date: 2025-01-12 15:47:22
tags:
  - JavaScript
  - JSON.stringify
  - Date
category: 前端
cover:  ./cover.jpg
---

## 一个"简单"的需求
在与后端联调时，需要传递一个时间给后端，开发时没注意格式，在参数对象中直接传递了Date对象，结果后端接收到的数据格式不对，先看看后端接收到的数据格式是什么样的。

```json
{
  acceptedTimeStart: "2025-01-04T00:00:00.000Z",
}
```
额，这不是调用`toISOString`方法返回的ISO 8601 格式的字符串么。字面日期表示的日期时间，默认是UTC时间，所以需要转换为本地时间。所以后端使用也使用`Date`对象来接收。并配合合适的解析器就肯定没问题。然后此时后端要求的日期时间格式却是当前时区`yyyy-MM-dd HH:mm:ss`，所以需要转换一下。我也搞不明白为什么要这样，使用时间戳或者UTC时间不香吗？不过后端接口有要求，对于我来说这也是小菜一碟，都不用在业务代码中处理，在axios拦截器中处理一下就完事了。

先看转换代码
```javascript
function formatDate(data) {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (value instanceof Date) {
      return '后端要求的格式';  // 这里不写具体逻辑了
    }
    return value;
  }));
}
```

写完代码后，我信心满满，心想这回肯定没问题了，这种小case都不需要自测的对不对，直接提交代码测试

那么你来看看这段代码有什么问题吗？

能有什么问题对不对，检测到属性值如果是日期格式就返回接口要求的格式，能有什么问题呢，类似的代码又不是第一次写了。然而就是这种"简单"的需求，却让我踩了一个大坑。


## Bug
在我的摸鱼时候，我收到了反馈，说我的代码有问题，后端接收到的数据格式依然不对。那怎么可能，但是事实胜于雄辩，我打开浏览器，打开控制台，执行了一下上面的代码，真的不对。日期依然是ISO 8601 格式的字符串。如此看来这个if条件为假了，那么问题出在哪里呢？那我倒要看看这个value到底是什么。不是日期对象么、

添加了句console.log(value, typeof value)，发现value是ISO 8601 格式的字符串，不是日期对象。也就是说在JSON.stringify中，在调用replacer函数时，value已经是ISO 8601 格式的字符串了，而不是日期对象。这尼码不是坑爹么。为什么要这么设计。

## 解决方案
问题找到了，解决方案也就有了，既然在调用replacer函数时，value已经是ISO 8601 格式的字符串了，那么我就在上一层处理。机智如我呢。
```javascript
function formatDate(data) {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (value && typeof value === 'object') {
      for (const name in value) {
        if (value[name] instanceof Date) {
          value[name] = '后端要求的格式';  // 这里不写具体逻辑了
        }
      }
    }
    return value;
  }));
}
```

代码可能不完善，但是对于当前需求来说，已经够用了。


## 总结

老实自测，不要偷懒。Js里看似简单的API, 其实背后都有很多逻辑细节，一不小心就会为自己的不扎实买单。

---

其实关于stringify处理Date对象的逻辑在[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)上也有说明，**stringify在处理数据时会优先调用toJSON方法，而Date的toJSON方法返回的就是ISO 8601 格式的字符串**。只怪自己没有仔细看。






