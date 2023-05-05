---
title: "jquery1.7中通过trigger触发checkbox的click事件的一个小坑"
author: 柚子816
toc: true
comment: true
date: 2016-02-06 16:33:00
tags: 
  - jquery
keywords:
  - checkbox
  - trigger
  - click
category: 前端
cover: 
---


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="jquery-1.7.2.js"></script>
</head>
<body>
    <input id="checkbox" type="checkbox" />
    <input type="checkbox" id="trigger" />点这个
    <hr>
    <div id="result"></div>
    <script type="text/javascript">
        $('#trigger').on('click', function () {
            $('#checkbox').trigger('click');
        });

        $('#checkbox').on('click', function () {
            $('#result').append($(this).is(':checked') + '<br />');
        });
    </script>
</body>
</html>
```

对于上面这段代码，如果直接点id:checkbox，输出的结果和复选框点击之后的状态一致，如果点击trigger通过jquery的trigger触发id:checkbox的click事件，输出的结果和复选框点击之前的状态一致。

但是如果将jquery换成1.11.3版本，不管直接点击，还是通过trigger来触发，输出的结果都筛选框点击之后的状态，这也是我想要的结果

坑啊，如果想在1.7.2版本和1.11.3版本保持一致，可以将id:checkbox事件的处理过程放在setTimeout里面

