---
title: "chrome插件开发二"
author: 柚子816
toc: true
comment: true
date: 2016-08-10 13:54:00
tags: 
  - chrome
keywords:
  - 插件
category: 
cover: /static/base/image/default-head.1e231ca0.jpg
---

补上次写的 [chrome插件开发](/blog/article/16)

在上篇文章里面用


​    
```js
chrome.tabs.executeScript({file: 'statics/js/insert.js'}, function () {  
});
```

这样的方式在当前页面注入一段js脚本，从而达到操作当前页面的功能，然而在有一些情况用这样的方式来注入文件是有问题的，比如jquery这样的一些公用库，如果在多个操作中需要用到jquery，不能在每次操作的时候都注入jquery，这样每次都是重新加载一次jquery，也就没有什么意义了。这时候就要用到content_script配置了

在manifest.json配置文件中添加contentScript配置如下


​    
```json
"content_scripts": [{
        "matches": ["*://*.baidu.com/*", "*://*.qq.com/*"],
        "js": ["statics/js/jquery-1.7.2.js"]
}]
```

其中js是用来指定要注入哪些js文件的，matches是用来指定需要对哪些网站进入注入，这里用百度和腾讯的页面做个测试

content_script还可以用配置css来注入一些css，以及一些其它的的配置，

可以参考文档

[chrome官网](https://developer.chrome.com/extensions)

以及[360开发平台](http://open.chrome.360.cn/extension_dev/overview.html)

