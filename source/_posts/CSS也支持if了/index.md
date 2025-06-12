---
title: CSS也支持if了
author: 柚子816
toc: true
comment: true
date: 2025-06-12 13:51:37
tags:
  - CSS
  - if
category: 前端
cover: ./cover.jpg
---
是的，你没看错，CSS也支持if了！不过，这是一个上相对较新的功能，目前还没有得到广泛的支持。我当前使用的是chrome137版本，相信其它浏览器也会陆续支持。

## 什么是css if函数
CSS if函数是一种条件语句，它可以根据条件来选择不同的样式。可以更加灵活地编写响应式的CSS样式。

### 基本语法
```css
property: if(condition: value-if-true; else: value-if-false);
```


### 那要怎么用呢
其实最容易想到的的应用场景就是深浅色主题切换了，我们可以根据用户设置来选择不同的样式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    div {
      width: 100px;
      height: 20px;
      background-color: if(style(--theme: dark): red; else: blue);
    }
  </style>
</head>
<body>
  <div style="--theme: dark"></div>
  <div style="--theme: light"></div>
</body>
</html>
```

效果如下：
![](./theme.png)

当然你也可以在一个if函数写多个条件，语法如下
```css
property: if(
  condition1: value-if-true1; 
  condition2: value-if-true2; 
  else: value-if-false
);
```

我们可以这样用它

```html
<style>
  .button {
    color: white;
    padding: 10px 20px;
    display: inline-block;
    background: if(style(--btn-type:primary): #4299e1;
        style(--btn-type: success): #48bb78;
        style(--btn-type: danger): #f56565;
        style(--btn-type: warning): #ed8936;
        else: #2d3748);
  }
</style>

<div class="button" style="--btn-type: primary">Primary</div>
<div class="button" style="--btn-type: success">Success</div>
<div class="button" style="--btn-type: danger">Danger</div>
<div class="button" style="--btn-type: warning">Warning</div>
```

效果如下：
![](./button.png)


----

新特性，功能可能还不够完善，实际应用场景还需要大家去探索。单从上面的例子来看，貌似直接使用传统方式也没有什么问题。但是使用if函数，可以把逻辑集中，不至于分散在多个不行的class中，或者不同media query中