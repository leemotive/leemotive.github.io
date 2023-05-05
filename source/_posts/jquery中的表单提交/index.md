---
title: "jquery中的表单提交"
author: 柚子816
toc: true
comment: true
date: 2016-05-31 21:44:00
tags: 
  - jquery
keywords:
  - submit
category: 前端
cover: 
---

在5月的最后一天记一个jquery中的表单提交在ie8中的一个坑

在项目中遇到这么个要求，点击按钮执行一段js，在条件满足之后，post方式提交一个请求，但是不能用ajax

所以在js中我写了段这样的代码


​    
```html
var $form = $('<form>', {'action': 'http://www.baidu.com', 'method': 'get'});
$form.append($('<input>', {type:'hidden', name: 'param', val: 23}));
$form.submit();
```

在chrome中是没有什么问题的，也是一直在chrome中测试的，可是在ie8（其它版本没测试），firefox中却是无法正常提交的，坑啊。

解决方案就是将表单写进页面，然后获取后再提交


​    
```js
var $form = $('#form');
$form.empty();
$form.append($('<input>', {type:'hidden', name: 'param', val: 23}));
$form.submit();
```

