---
title: 真不要依赖dom结构
author: 柚子816
toc: true
comment: true
date: 2025-04-11 11:03:51
tags:
  - dom
category: 前端
cover: ./cover.jpg
---

被上了一课，一个好好的功能突然有一天就不行了。原因只是因为安装了一个浏览器插件。一个浏览器插件是如何能影响我项目的功能的呢



说起来功能也很简单，就是密码输入框旁边的的图标，用来控制显示或者隐藏密码内容。原本是没问题的，但是chrome安装了一个LastPass的插件，这个功能就失效了，这就离了个大普。那下面就看看这到底怎么回事



下面就看一下示例代码

```html
<div>
  <i class="icon-user"></i>
  <input tpye="password" />
  <i class="icon-eye"></i>
</div>

<script>
// 点击眼睛图标的回调函数
function changeVisible(event) {
  var target = event.target;
  if (文本状态) {
    // 切换为密码状态
    target.previousElementSibling.type = 'password'
  } else {
    // 切换为文本状态
    target.previousElementSibling.type = 'text'
  }
}
</script>
```



原本工作正常，奈何有一天有人安装了插件 [LastPass](https://chromewebstore.google.com/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd?utm_source=ext_app_menu) ,这个插件具体什么功能没研究，只是发现这个插件会在密码框后面插入一个图标。插件运行之后，原本的dom变成了下面这样

```html
<div>
  <i class="icon-user"></i>
  <input tpye="password" />
  <i class="last-pass-icon"></i>
  <i class="icon-eye"></i>
</div>
```

下面的问题就明白了。由于插件改变了原来的dom结构，导致原代码中使用的 `previousElementSibling` 获取到的就不再是原来的input了。这就导致了原来的功能失效



----

问题不大，简单记录一下。每次都有不同的坑。但凡有可能，就不要使用这类dom结构相关的api, 查找获取元素尽量使用class,id之类的。









